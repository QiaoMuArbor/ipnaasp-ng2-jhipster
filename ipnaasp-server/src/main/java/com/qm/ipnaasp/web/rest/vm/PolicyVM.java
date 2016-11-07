package com.qm.ipnaasp.web.rest.vm;

import com.qm.ipnaasp.domain.Team;
import com.qm.ipnaasp.domain.User;
import com.qm.ipnaasp.domain.enumeration.PolicyCycle;
import com.qm.ipnaasp.domain.enumeration.PolicyStatus;
import com.qm.ipnaasp.domain.enumeration.PolicyType;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

/**
 * Created by Administrator on 2016/11/7.
 */
public class PolicyVM {

    private PolicyType type;
    private Boolean direction;
    private PolicyStatus status;
    private ZonedDateTime createTime;
    private ZonedDateTime entryTime;
    private ZonedDateTime exitTime;
    private Float entryPoint;
    private Float exitPoint;
    private String reason;
    private Boolean push;
    private PolicyCycle cycle;
    private String login;
//    private Team team;

    public PolicyType getType() {
        return type;
    }

    public void setType(PolicyType type) {
        this.type = type;
    }

    public Boolean getDirection() {
        return direction;
    }

    public void setDirection(Boolean direction) {
        this.direction = direction;
    }

    public PolicyStatus getStatus() {
        return status;
    }

    public void setStatus(PolicyStatus status) {
        this.status = status;
    }

    public ZonedDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(ZonedDateTime createTime) {
        this.createTime = createTime;
    }

    public ZonedDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(ZonedDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public ZonedDateTime getExitTime() {
        return exitTime;
    }

    public void setExitTime(ZonedDateTime exitTime) {
        this.exitTime = exitTime;
    }

    public Float getEntryPoint() {
        return entryPoint;
    }

    public void setEntryPoint(Float entryPoint) {
        this.entryPoint = entryPoint;
    }

    public Float getExitPoint() {
        return exitPoint;
    }

    public void setExitPoint(Float exitPoint) {
        this.exitPoint = exitPoint;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getPush() {
        return push;
    }

    public void setPush(Boolean push) {
        this.push = push;
    }

    public PolicyCycle getCycle() {
        return cycle;
    }

    public void setCycle(PolicyCycle cycle) {
        this.cycle = cycle;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Override
    public String toString() {
        return "PolicyVM{" +
            "type=" + type +
            ", direction=" + direction +
            ", status=" + status +
            ", createTime=" + createTime +
            ", entryTime=" + entryTime +
            ", exitTime=" + exitTime +
            ", entryPoint=" + entryPoint +
            ", exitPoint=" + exitPoint +
            ", reason='" + reason + '\'' +
            ", push=" + push +
            ", cycle=" + cycle +
            ", login='" + login + '\'' +
            '}';
    }
}
