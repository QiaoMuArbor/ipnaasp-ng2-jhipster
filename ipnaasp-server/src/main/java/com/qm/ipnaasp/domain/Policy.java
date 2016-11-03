package com.qm.ipnaasp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.qm.ipnaasp.domain.enumeration.PolicyType;

import com.qm.ipnaasp.domain.enumeration.PolicyStatus;

/**
 * A Policy.
 */
@Entity
@Table(name = "policy")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Policy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private PolicyType type;

    @NotNull
    @Column(name = "direction", nullable = false)
    private Boolean direction;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private PolicyStatus status;

    @NotNull
    @Column(name = "create_time", nullable = false)
    private ZonedDateTime createTime;

    @Column(name = "entry_time")
    private ZonedDateTime entryTime;

    @Column(name = "exit_time")
    private ZonedDateTime exitTime;

    @NotNull
    @Column(name = "entry_point", nullable = false)
    private Float entryPoint;

    @NotNull
    @Column(name = "exit_point", nullable = false)
    private Float exitPoint;

    @Column(name = "reason")
    private String reason;

    @NotNull
    @Column(name = "push", nullable = false)
    private Boolean push;

    @Column(name = "real_entry_point")
    private Float realEntryPoint;

    @Column(name = "real_exit_point")
    private Float realExitPoint;

    @ManyToOne
    @NotNull
    private User creator;

    @ManyToOne
    private Team team;

    @OneToMany(mappedBy = "policy")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Recording> recordings = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PolicyType getType() {
        return type;
    }

    public Policy type(PolicyType type) {
        this.type = type;
        return this;
    }

    public void setType(PolicyType type) {
        this.type = type;
    }

    public Boolean isDirection() {
        return direction;
    }

    public Policy direction(Boolean direction) {
        this.direction = direction;
        return this;
    }

    public void setDirection(Boolean direction) {
        this.direction = direction;
    }

    public PolicyStatus getStatus() {
        return status;
    }

    public Policy status(PolicyStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(PolicyStatus status) {
        this.status = status;
    }

    public ZonedDateTime getCreateTime() {
        return createTime;
    }

    public Policy createTime(ZonedDateTime createTime) {
        this.createTime = createTime;
        return this;
    }

    public void setCreateTime(ZonedDateTime createTime) {
        this.createTime = createTime;
    }

    public ZonedDateTime getEntryTime() {
        return entryTime;
    }

    public Policy entryTime(ZonedDateTime entryTime) {
        this.entryTime = entryTime;
        return this;
    }

    public void setEntryTime(ZonedDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public ZonedDateTime getExitTime() {
        return exitTime;
    }

    public Policy exitTime(ZonedDateTime exitTime) {
        this.exitTime = exitTime;
        return this;
    }

    public void setExitTime(ZonedDateTime exitTime) {
        this.exitTime = exitTime;
    }

    public Float getEntryPoint() {
        return entryPoint;
    }

    public Policy entryPoint(Float entryPoint) {
        this.entryPoint = entryPoint;
        return this;
    }

    public void setEntryPoint(Float entryPoint) {
        this.entryPoint = entryPoint;
    }

    public Float getExitPoint() {
        return exitPoint;
    }

    public Policy exitPoint(Float exitPoint) {
        this.exitPoint = exitPoint;
        return this;
    }

    public void setExitPoint(Float exitPoint) {
        this.exitPoint = exitPoint;
    }

    public String getReason() {
        return reason;
    }

    public Policy reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean isPush() {
        return push;
    }

    public Policy push(Boolean push) {
        this.push = push;
        return this;
    }

    public void setPush(Boolean push) {
        this.push = push;
    }

    public Float getRealEntryPoint() {
        return realEntryPoint;
    }

    public Policy realEntryPoint(Float realEntryPoint) {
        this.realEntryPoint = realEntryPoint;
        return this;
    }

    public void setRealEntryPoint(Float realEntryPoint) {
        this.realEntryPoint = realEntryPoint;
    }

    public Float getRealExitPoint() {
        return realExitPoint;
    }

    public Policy realExitPoint(Float realExitPoint) {
        this.realExitPoint = realExitPoint;
        return this;
    }

    public void setRealExitPoint(Float realExitPoint) {
        this.realExitPoint = realExitPoint;
    }

    public User getCreator() {
        return creator;
    }

    public Policy creator(User user) {
        this.creator = user;
        return this;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public Team getTeam() {
        return team;
    }

    public Policy team(Team team) {
        this.team = team;
        return this;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Set<Recording> getRecordings() {
        return recordings;
    }

    public Policy recordings(Set<Recording> recordings) {
        this.recordings = recordings;
        return this;
    }

    public Policy addRecordings(Recording recording) {
        recordings.add(recording);
        recording.setPolicy(this);
        return this;
    }

    public Policy removeRecordings(Recording recording) {
        recordings.remove(recording);
        recording.setPolicy(null);
        return this;
    }

    public void setRecordings(Set<Recording> recordings) {
        this.recordings = recordings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Policy policy = (Policy) o;
        if(policy.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, policy.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Policy{" +
            "id=" + id +
            ", type='" + type + "'" +
            ", direction='" + direction + "'" +
            ", status='" + status + "'" +
            ", createTime='" + createTime + "'" +
            ", entryTime='" + entryTime + "'" +
            ", exitTime='" + exitTime + "'" +
            ", entryPoint='" + entryPoint + "'" +
            ", exitPoint='" + exitPoint + "'" +
            ", reason='" + reason + "'" +
            ", push='" + push + "'" +
            ", realEntryPoint='" + realEntryPoint + "'" +
            ", realExitPoint='" + realExitPoint + "'" +
            '}';
    }
}
