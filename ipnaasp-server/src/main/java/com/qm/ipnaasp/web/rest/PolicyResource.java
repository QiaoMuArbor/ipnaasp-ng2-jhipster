package com.qm.ipnaasp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qm.ipnaasp.domain.Policy;
import com.qm.ipnaasp.service.PolicyService;
import com.qm.ipnaasp.web.rest.util.HeaderUtil;
import com.qm.ipnaasp.web.rest.vm.PolicyVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Policy.
 */
@RestController
@RequestMapping("/api")
public class PolicyResource {

    private final Logger log = LoggerFactory.getLogger(PolicyResource.class);

    @Inject
    private PolicyService policyService;

    /**
     * POST  /policies : Create a new policy.
     *
     * @param policyVM the policy to create
     * @return the ResponseEntity with status 201 (Created) and with body the new policy, or with status 400 (Bad Request) if the policy has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/policies")
    @Timed
    public ResponseEntity<Policy> createPolicy(@Valid @RequestBody PolicyVM policyVM) throws URISyntaxException {
        log.debug("REST request to save Policy : {}", policyVM);
        if (policyVM.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("policy", "idexists", "A new policy cannot already have an ID")).body(null);
        }
        Policy result = policyService.createPolicy(policyVM);
        return ResponseEntity.created(new URI("/api/policies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("policy", result.getId().toString()))
            .body(result);
    }
//    public ResponseEntity<Policy> createPolicy(@Valid @RequestBody Policy policy) throws URISyntaxException {
//        log.debug("REST request to save Policy : {}", policy);
//        if (policy.getId() != null) {
//            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("policy", "idexists", "A new policy cannot already have an ID")).body(null);
//        }
//        Policy result = policyService.save(policy);
//        return ResponseEntity.created(new URI("/api/policies/" + result.getId()))
//            .headers(HeaderUtil.createEntityCreationAlert("policy", result.getId().toString()))
//            .body(result);
//    }


    /**
     * PUT  /policies : Updates an existing policy.
     *
     * @param policyVM the policy to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated policy,
     * or with status 400 (Bad Request) if the policy is not valid,
     * or with status 500 (Internal Server Error) if the policy couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/policies")
    @Timed
    public ResponseEntity<Policy> updatePolicy(@Valid @RequestBody PolicyVM policyVM) throws URISyntaxException {
        log.debug("REST request to update Policy : {}", policyVM);
        if (policyVM.getId() == null) {
            return createPolicy(policyVM);
        }
        Policy result = policyService.createPolicy(policyVM);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("policy", policyVM.getId().toString()))
            .body(result);
    }
//    public ResponseEntity<Policy> updatePolicy(@Valid @RequestBody Policy policy) throws URISyntaxException {
//        log.debug("REST request to update Policy : {}", policy);
//        if (policy.getId() == null) {
//            return createPolicy(policy);
//        }
//        Policy result = policyService.save(policy);
//        return ResponseEntity.ok()
//            .headers(HeaderUtil.createEntityUpdateAlert("policy", policy.getId().toString()))
//            .body(result);
//    }
    /**
     * GET  /policies : get all the policies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of policies in body
     */
    @GetMapping("/policies")
    @Timed
    public List<Policy> getAllPolicies() {
        log.debug("REST request to get all Policies");
        return policyService.findAll();
    }

    /**
     * GET  /policies/:id : get the "id" policy.
     *
     * @param id the id of the policy to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the policy, or with status 404 (Not Found)
     */
    @GetMapping("/policies/{id}")
    @Timed
    public ResponseEntity<Policy> getPolicy(@PathVariable Long id) {
        log.debug("REST request to get Policy : {}", id);
        Policy policy = policyService.findOne(id);
        return Optional.ofNullable(policy)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /policies/:id : delete the "id" policy.
     *
     * @param id the id of the policy to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/policies/{id}")
    @Timed
    public ResponseEntity<Void> deletePolicy(@PathVariable Long id) {
        log.debug("REST request to delete Policy : {}", id);
        policyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("policy", id.toString())).build();
    }

}
