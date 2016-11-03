package com.qm.ipnaasp.repository;

import com.qm.ipnaasp.domain.Recording;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Recording entity.
 */
@SuppressWarnings("unused")
public interface RecordingRepository extends JpaRepository<Recording,Long> {

    @Query("select recording from Recording recording where recording.recorder.login = ?#{principal.username}")
    List<Recording> findByRecorderIsCurrentUser();

}
