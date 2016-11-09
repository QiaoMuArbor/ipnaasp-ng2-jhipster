package com.qm.ipnaasp.web.rest;

import com.qm.ipnaasp.IpnaaspApp;

import com.qm.ipnaasp.domain.Policy;
import com.qm.ipnaasp.domain.User;
import com.qm.ipnaasp.repository.PolicyRepository;
import com.qm.ipnaasp.service.PolicyService;

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

import com.qm.ipnaasp.domain.enumeration.PolicyType;
import com.qm.ipnaasp.domain.enumeration.PolicyStatus;
import com.qm.ipnaasp.domain.enumeration.PolicyCycle;
/**
 * Test class for the PolicyResource REST controller.
 *
 * @see PolicyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IpnaaspApp.class)
public class PolicyResourceIntTest {

    private static final PolicyType DEFAULT_TYPE = PolicyType.黄金;
    private static final PolicyType UPDATED_TYPE = PolicyType.白银;

    private static final Boolean DEFAULT_DIRECTION = false;
    private static final Boolean UPDATED_DIRECTION = true;

    private static final PolicyStatus DEFAULT_STATUS = PolicyStatus.waitPolicy;
    private static final PolicyStatus UPDATED_STATUS = PolicyStatus.enterPolicy;

    private static final ZonedDateTime DEFAULT_CREATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_CREATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_CREATE_TIME_STR = DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(DEFAULT_CREATE_TIME);

    private static final ZonedDateTime DEFAULT_ENTRY_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_ENTRY_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_ENTRY_TIME_STR = DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(DEFAULT_ENTRY_TIME);

    private static final ZonedDateTime DEFAULT_EXIT_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneId.systemDefault());
    private static final ZonedDateTime UPDATED_EXIT_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_EXIT_TIME_STR = DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(DEFAULT_EXIT_TIME);

    private static final Float DEFAULT_ENTRY_POINT = 1F;
    private static final Float UPDATED_ENTRY_POINT = 2F;

    private static final Float DEFAULT_EXIT_POINT = 1F;
    private static final Float UPDATED_EXIT_POINT = 2F;

    private static final String DEFAULT_REASON = "AAAAA";
    private static final String UPDATED_REASON = "BBBBB";

    private static final Boolean DEFAULT_PUSH = false;
    private static final Boolean UPDATED_PUSH = true;

    private static final PolicyCycle DEFAULT_CYCLE = PolicyCycle.UshortTermO;
    private static final PolicyCycle UPDATED_CYCLE = PolicyCycle.ShortTermO;

    @Inject
    private PolicyRepository policyRepository;

    @Inject
    private PolicyService policyService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restPolicyMockMvc;

    private Policy policy;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PolicyResource policyResource = new PolicyResource();
        ReflectionTestUtils.setField(policyResource, "policyService", policyService);
        this.restPolicyMockMvc = MockMvcBuilders.standaloneSetup(policyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Policy createEntity(EntityManager em) {
        Policy policy = new Policy()
                .type(DEFAULT_TYPE)
                .direction(DEFAULT_DIRECTION)
                .status(DEFAULT_STATUS)
                .createTime(DEFAULT_CREATE_TIME)
                .entryTime(DEFAULT_ENTRY_TIME)
                .exitTime(DEFAULT_EXIT_TIME)
                .entryPoint(DEFAULT_ENTRY_POINT)
                .exitPoint(DEFAULT_EXIT_POINT)
                .reason(DEFAULT_REASON)
                .push(DEFAULT_PUSH)
                .cycle(DEFAULT_CYCLE);
        // Add required entity
        User creator = UserResourceIntTest.createEntity(em);
        em.persist(creator);
        em.flush();
        policy.setCreator(creator);
        return policy;
    }

    @Before
    public void initTest() {
        policy = createEntity(em);
    }

    @Test
    @Transactional
    public void createPolicy() throws Exception {
        int databaseSizeBeforeCreate = policyRepository.findAll().size();

        // Create the Policy

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isCreated());

        // Validate the Policy in the database
        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeCreate + 1);
        Policy testPolicy = policies.get(policies.size() - 1);
        assertThat(testPolicy.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPolicy.isDirection()).isEqualTo(DEFAULT_DIRECTION);
        assertThat(testPolicy.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPolicy.getCreateTime()).isEqualTo(DEFAULT_CREATE_TIME);
        assertThat(testPolicy.getEntryTime()).isEqualTo(DEFAULT_ENTRY_TIME);
        assertThat(testPolicy.getExitTime()).isEqualTo(DEFAULT_EXIT_TIME);
        assertThat(testPolicy.getEntryPoint()).isEqualTo(DEFAULT_ENTRY_POINT);
        assertThat(testPolicy.getExitPoint()).isEqualTo(DEFAULT_EXIT_POINT);
        assertThat(testPolicy.getReason()).isEqualTo(DEFAULT_REASON);
        assertThat(testPolicy.isPush()).isEqualTo(DEFAULT_PUSH);
        assertThat(testPolicy.getCycle()).isEqualTo(DEFAULT_CYCLE);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setType(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDirectionIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setDirection(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setStatus(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setCreateTime(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEntryPointIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setEntryPoint(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkExitPointIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setExitPoint(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPushIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setPush(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCycleIsRequired() throws Exception {
        int databaseSizeBeforeTest = policyRepository.findAll().size();
        // set the field null
        policy.setCycle(null);

        // Create the Policy, which fails.

        restPolicyMockMvc.perform(post("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(policy)))
                .andExpect(status().isBadRequest());

        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPolicies() throws Exception {
        // Initialize the database
        policyRepository.saveAndFlush(policy);

        // Get all the policies
        restPolicyMockMvc.perform(get("/api/policies?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(policy.getId().intValue())))
                .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
                .andExpect(jsonPath("$.[*].direction").value(hasItem(DEFAULT_DIRECTION.booleanValue())))
                .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
                .andExpect(jsonPath("$.[*].createTime").value(hasItem(DEFAULT_CREATE_TIME_STR)))
                .andExpect(jsonPath("$.[*].entryTime").value(hasItem(DEFAULT_ENTRY_TIME_STR)))
                .andExpect(jsonPath("$.[*].exitTime").value(hasItem(DEFAULT_EXIT_TIME_STR)))
                .andExpect(jsonPath("$.[*].entryPoint").value(hasItem(DEFAULT_ENTRY_POINT.doubleValue())))
                .andExpect(jsonPath("$.[*].exitPoint").value(hasItem(DEFAULT_EXIT_POINT.doubleValue())))
                .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())))
                .andExpect(jsonPath("$.[*].push").value(hasItem(DEFAULT_PUSH.booleanValue())))
                .andExpect(jsonPath("$.[*].cycle").value(hasItem(DEFAULT_CYCLE.toString())));
    }

    @Test
    @Transactional
    public void getPolicy() throws Exception {
        // Initialize the database
        policyRepository.saveAndFlush(policy);

        // Get the policy
        restPolicyMockMvc.perform(get("/api/policies/{id}", policy.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(policy.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.direction").value(DEFAULT_DIRECTION.booleanValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.createTime").value(DEFAULT_CREATE_TIME_STR))
            .andExpect(jsonPath("$.entryTime").value(DEFAULT_ENTRY_TIME_STR))
            .andExpect(jsonPath("$.exitTime").value(DEFAULT_EXIT_TIME_STR))
            .andExpect(jsonPath("$.entryPoint").value(DEFAULT_ENTRY_POINT.doubleValue()))
            .andExpect(jsonPath("$.exitPoint").value(DEFAULT_EXIT_POINT.doubleValue()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()))
            .andExpect(jsonPath("$.push").value(DEFAULT_PUSH.booleanValue()))
            .andExpect(jsonPath("$.cycle").value(DEFAULT_CYCLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPolicy() throws Exception {
        // Get the policy
        restPolicyMockMvc.perform(get("/api/policies/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePolicy() throws Exception {
        // Initialize the database
        policyService.save(policy);

        int databaseSizeBeforeUpdate = policyRepository.findAll().size();

        // Update the policy
        Policy updatedPolicy = policyRepository.findOne(policy.getId());
        updatedPolicy
                .type(UPDATED_TYPE)
                .direction(UPDATED_DIRECTION)
                .status(UPDATED_STATUS)
                .createTime(UPDATED_CREATE_TIME)
                .entryTime(UPDATED_ENTRY_TIME)
                .exitTime(UPDATED_EXIT_TIME)
                .entryPoint(UPDATED_ENTRY_POINT)
                .exitPoint(UPDATED_EXIT_POINT)
                .reason(UPDATED_REASON)
                .push(UPDATED_PUSH)
                .cycle(UPDATED_CYCLE);

        restPolicyMockMvc.perform(put("/api/policies")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedPolicy)))
                .andExpect(status().isOk());

        // Validate the Policy in the database
        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeUpdate);
        Policy testPolicy = policies.get(policies.size() - 1);
        assertThat(testPolicy.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPolicy.isDirection()).isEqualTo(UPDATED_DIRECTION);
        assertThat(testPolicy.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPolicy.getCreateTime()).isEqualTo(UPDATED_CREATE_TIME);
        assertThat(testPolicy.getEntryTime()).isEqualTo(UPDATED_ENTRY_TIME);
        assertThat(testPolicy.getExitTime()).isEqualTo(UPDATED_EXIT_TIME);
        assertThat(testPolicy.getEntryPoint()).isEqualTo(UPDATED_ENTRY_POINT);
        assertThat(testPolicy.getExitPoint()).isEqualTo(UPDATED_EXIT_POINT);
        assertThat(testPolicy.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testPolicy.isPush()).isEqualTo(UPDATED_PUSH);
        assertThat(testPolicy.getCycle()).isEqualTo(UPDATED_CYCLE);
    }

    @Test
    @Transactional
    public void deletePolicy() throws Exception {
        // Initialize the database
        policyService.save(policy);

        int databaseSizeBeforeDelete = policyRepository.findAll().size();

        // Get the policy
        restPolicyMockMvc.perform(delete("/api/policies/{id}", policy.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Policy> policies = policyRepository.findAll();
        assertThat(policies).hasSize(databaseSizeBeforeDelete - 1);
    }
}
