package com.qm.ipnaasp.service;

import com.qm.ipnaasp.domain.Policy;
import com.qm.ipnaasp.repository.PolicyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Policy.
 */
@Service
@Transactional
public class PolicyService {

    private final Logger log = LoggerFactory.getLogger(PolicyService.class);
    
    @Inject
    private PolicyRepository policyRepository;

    /**
     * Save a policy.
     *
     * @param policy the entity to save
     * @return the persisted entity
     */
    public Policy save(Policy policy) {
        log.debug("Request to save Policy : {}", policy);
        Policy result = policyRepository.save(policy);
        return result;
    }

    /**
     *  Get all the policies.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Policy> findAll() {
        log.debug("Request to get all Policies");
        List<Policy> result = policyRepository.findAll();

        return result;
    }

    /**
     *  Get one policy by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Policy findOne(Long id) {
        log.debug("Request to get Policy : {}", id);
        Policy policy = policyRepository.findOne(id);
        return policy;
    }

    /**
     *  Delete the  policy by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Policy : {}", id);
        policyRepository.delete(id);
    }
}