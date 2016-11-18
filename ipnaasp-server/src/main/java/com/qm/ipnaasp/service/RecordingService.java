package com.qm.ipnaasp.service;

import com.qm.ipnaasp.domain.Recording;
import com.qm.ipnaasp.repository.RecordingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Recording.
 */
@Service
@Transactional
public class RecordingService {

    private final Logger log = LoggerFactory.getLogger(RecordingService.class);

    @Inject
    private RecordingRepository recordingRepository;

    /**
     * Save a recording.
     *
     * @param recording the entity to save
     * @return the persisted entity
     */
    public Recording save(Recording recording) {
        log.debug("Request to save Recording : {}", recording);
        Recording result = recordingRepository.save(recording);
        return result;
    }

    /**
     *  Get all the recordings.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Recording> findAll() {
        log.debug("Request to get all Recordings");
        List<Recording> result = recordingRepository.findAll();

        return result;
    }

    /**
     *  Get one recording by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Recording findOne(Long id) {
        log.debug("Request to get Recording : {}", id);
        Recording recording = recordingRepository.findOne(id);
        return recording;
    }

    @Transactional(readOnly = true)
    public List<Recording> findRecordingByCurrentPolicyID(Long id) {
        log.debug("Request to get Recording : {}", id);
        List<Recording> recordings = recordingRepository.findRecordingByCurrentPolicyID(id);
        return recordings;
    }

    /**
     *  Delete the  recording by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Recording : {}", id);
        recordingRepository.delete(id);
    }
}
