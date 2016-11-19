package com.qm.ipnaasp.service;

import com.qm.ipnaasp.domain.Policy;
import com.qm.ipnaasp.domain.Recording;
import com.qm.ipnaasp.repository.PolicyRepository;
import com.qm.ipnaasp.repository.RecordingRepository;
import com.qm.ipnaasp.repository.UserRepository;
import com.qm.ipnaasp.security.SecurityUtils;
import com.qm.ipnaasp.web.rest.vm.RecordingVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.time.ZonedDateTime;
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

    @Inject
    private UserRepository userRepository;

    @Inject
    private PolicyRepository policyRepository;
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



    @Transactional(readOnly = true)
    public Recording createRecording(RecordingVM recordingVM) {
        Recording recording = new Recording();
        recording.setContent(recordingVM.getContent());
        recording.setType(recordingVM.getType());
        log.debug("Request to get Policy : {}", recordingVM.getPolicyID());
        Policy policy = policyRepository.findOne(recordingVM.getPolicyID());
        recording.setPolicy(policy);
        userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()).ifPresent(u -> {
            recording.setRecorder(u);
            log.debug("get current user: {}", u);
        });
        recording.setRecordingTime(ZonedDateTime.now());
        Recording result = recordingRepository.save(recording);
        policy.addRecordings(result);
        policyRepository.save(policy);
        policyRepository.flush();
        log.debug("Request to save Recording : {}", recording);
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
