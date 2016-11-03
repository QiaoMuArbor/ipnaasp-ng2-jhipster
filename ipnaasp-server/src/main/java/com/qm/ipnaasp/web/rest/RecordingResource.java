package com.qm.ipnaasp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.qm.ipnaasp.domain.Recording;
import com.qm.ipnaasp.service.RecordingService;
import com.qm.ipnaasp.web.rest.util.HeaderUtil;
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
 * REST controller for managing Recording.
 */
@RestController
@RequestMapping("/api")
public class RecordingResource {

    private final Logger log = LoggerFactory.getLogger(RecordingResource.class);
        
    @Inject
    private RecordingService recordingService;

    /**
     * POST  /recordings : Create a new recording.
     *
     * @param recording the recording to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recording, or with status 400 (Bad Request) if the recording has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recordings")
    @Timed
    public ResponseEntity<Recording> createRecording(@Valid @RequestBody Recording recording) throws URISyntaxException {
        log.debug("REST request to save Recording : {}", recording);
        if (recording.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("recording", "idexists", "A new recording cannot already have an ID")).body(null);
        }
        Recording result = recordingService.save(recording);
        return ResponseEntity.created(new URI("/api/recordings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("recording", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recordings : Updates an existing recording.
     *
     * @param recording the recording to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recording,
     * or with status 400 (Bad Request) if the recording is not valid,
     * or with status 500 (Internal Server Error) if the recording couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recordings")
    @Timed
    public ResponseEntity<Recording> updateRecording(@Valid @RequestBody Recording recording) throws URISyntaxException {
        log.debug("REST request to update Recording : {}", recording);
        if (recording.getId() == null) {
            return createRecording(recording);
        }
        Recording result = recordingService.save(recording);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("recording", recording.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recordings : get all the recordings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recordings in body
     */
    @GetMapping("/recordings")
    @Timed
    public List<Recording> getAllRecordings() {
        log.debug("REST request to get all Recordings");
        return recordingService.findAll();
    }

    /**
     * GET  /recordings/:id : get the "id" recording.
     *
     * @param id the id of the recording to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recording, or with status 404 (Not Found)
     */
    @GetMapping("/recordings/{id}")
    @Timed
    public ResponseEntity<Recording> getRecording(@PathVariable Long id) {
        log.debug("REST request to get Recording : {}", id);
        Recording recording = recordingService.findOne(id);
        return Optional.ofNullable(recording)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /recordings/:id : delete the "id" recording.
     *
     * @param id the id of the recording to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recordings/{id}")
    @Timed
    public ResponseEntity<Void> deleteRecording(@PathVariable Long id) {
        log.debug("REST request to delete Recording : {}", id);
        recordingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("recording", id.toString())).build();
    }

}
