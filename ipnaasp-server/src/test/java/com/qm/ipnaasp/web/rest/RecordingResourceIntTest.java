package com.qm.ipnaasp.web.rest;

import com.qm.ipnaasp.IpnaaspApp;

import com.qm.ipnaasp.domain.Recording;
import com.qm.ipnaasp.domain.Policy;
import com.qm.ipnaasp.repository.RecordingRepository;
import com.qm.ipnaasp.service.RecordingService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.qm.ipnaasp.domain.enumeration.RecordingType;
/**
 * Test class for the RecordingResource REST controller.
 *
 * @see RecordingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IpnaaspApp.class)
public class RecordingResourceIntTest {

    private static final RecordingType DEFAULT_RECORDING_TYPE = RecordingType.other;
    private static final RecordingType UPDATED_RECORDING_TYPE = RecordingType.addPolicy;

    private static final String DEFAULT_CONTENT = "AAAAA";
    private static final String UPDATED_CONTENT = "BBBBB";

    private static final ZonedDateTime DEFAULT_RECORDING_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_RECORDING_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_RECORDING_TIME_STR = DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(DEFAULT_RECORDING_TIME);

    @Inject
    private RecordingRepository recordingRepository;

    @Inject
    private RecordingService recordingService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restRecordingMockMvc;

    private Recording recording;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RecordingResource recordingResource = new RecordingResource();
        ReflectionTestUtils.setField(recordingResource, "recordingService", recordingService);
        this.restRecordingMockMvc = MockMvcBuilders.standaloneSetup(recordingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recording createEntity(EntityManager em) {
        Recording recording = new Recording()
                .recordingType(DEFAULT_RECORDING_TYPE)
                .content(DEFAULT_CONTENT)
                .recordingTime(DEFAULT_RECORDING_TIME);
        // Add required entity
        Policy policy = PolicyResourceIntTest.createEntity(em);
        em.persist(policy);
        em.flush();
        recording.setPolicy(policy);
        return recording;
    }

    @Before
    public void initTest() {
        recording = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecording() throws Exception {
        int databaseSizeBeforeCreate = recordingRepository.findAll().size();

        // Create the Recording

        restRecordingMockMvc.perform(post("/api/recordings")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(recording)))
                .andExpect(status().isCreated());

        // Validate the Recording in the database
        List<Recording> recordings = recordingRepository.findAll();
        assertThat(recordings).hasSize(databaseSizeBeforeCreate + 1);
        Recording testRecording = recordings.get(recordings.size() - 1);
        assertThat(testRecording.getRecordingType()).isEqualTo(DEFAULT_RECORDING_TYPE);
        assertThat(testRecording.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testRecording.getRecordingTime()).isEqualTo(DEFAULT_RECORDING_TIME);
    }

    @Test
    @Transactional
    public void checkRecordingTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordingRepository.findAll().size();
        // set the field null
        recording.setRecordingType(null);

        // Create the Recording, which fails.

        restRecordingMockMvc.perform(post("/api/recordings")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(recording)))
                .andExpect(status().isBadRequest());

        List<Recording> recordings = recordingRepository.findAll();
        assertThat(recordings).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRecordingTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = recordingRepository.findAll().size();
        // set the field null
        recording.setRecordingTime(null);

        // Create the Recording, which fails.

        restRecordingMockMvc.perform(post("/api/recordings")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(recording)))
                .andExpect(status().isBadRequest());

        List<Recording> recordings = recordingRepository.findAll();
        assertThat(recordings).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRecordings() throws Exception {
        // Initialize the database
        recordingRepository.saveAndFlush(recording);

        // Get all the recordings
        restRecordingMockMvc.perform(get("/api/recordings?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(recording.getId().intValue())))
                .andExpect(jsonPath("$.[*].recordingType").value(hasItem(DEFAULT_RECORDING_TYPE.toString())))
                .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
                .andExpect(jsonPath("$.[*].recordingTime").value(hasItem(DEFAULT_RECORDING_TIME_STR)));
    }

    @Test
    @Transactional
    public void getRecording() throws Exception {
        // Initialize the database
        recordingRepository.saveAndFlush(recording);

        // Get the recording
        restRecordingMockMvc.perform(get("/api/recordings/{id}", recording.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recording.getId().intValue()))
            .andExpect(jsonPath("$.recordingType").value(DEFAULT_RECORDING_TYPE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.recordingTime").value(DEFAULT_RECORDING_TIME_STR));
    }

    @Test
    @Transactional
    public void getNonExistingRecording() throws Exception {
        // Get the recording
        restRecordingMockMvc.perform(get("/api/recordings/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecording() throws Exception {
        // Initialize the database
        recordingService.save(recording);

        int databaseSizeBeforeUpdate = recordingRepository.findAll().size();

        // Update the recording
        Recording updatedRecording = recordingRepository.findOne(recording.getId());
        updatedRecording
                .recordingType(UPDATED_RECORDING_TYPE)
                .content(UPDATED_CONTENT)
                .recordingTime(UPDATED_RECORDING_TIME);

        restRecordingMockMvc.perform(put("/api/recordings")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedRecording)))
                .andExpect(status().isOk());

        // Validate the Recording in the database
        List<Recording> recordings = recordingRepository.findAll();
        assertThat(recordings).hasSize(databaseSizeBeforeUpdate);
        Recording testRecording = recordings.get(recordings.size() - 1);
        assertThat(testRecording.getRecordingType()).isEqualTo(UPDATED_RECORDING_TYPE);
        assertThat(testRecording.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testRecording.getRecordingTime()).isEqualTo(UPDATED_RECORDING_TIME);
    }

    @Test
    @Transactional
    public void deleteRecording() throws Exception {
        // Initialize the database
        recordingService.save(recording);

        int databaseSizeBeforeDelete = recordingRepository.findAll().size();

        // Get the recording
        restRecordingMockMvc.perform(delete("/api/recordings/{id}", recording.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Recording> recordings = recordingRepository.findAll();
        assertThat(recordings).hasSize(databaseSizeBeforeDelete - 1);
    }
}
