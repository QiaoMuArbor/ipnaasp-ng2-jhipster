package com.qm.ipnaasp.repository;

import com.qm.ipnaasp.domain.Policy;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Policy entity.
 */
@SuppressWarnings("unused")
public interface PolicyRepository extends JpaRepository<Policy,Long> {

    @Query("select policy from Policy policy where policy.user.login = ?#{principal.username}")
    List<Policy> findByUserIsCurrentUser();

}
