package com.qm.ipnaasp.web.rest.vm;

import com.qm.ipnaasp.domain.Team;
import com.qm.ipnaasp.domain.User;
import com.qm.ipnaasp.domain.enumeration.PolicyCycle;
import com.qm.ipnaasp.domain.enumeration.PolicyDirection;
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

    private Long id;
    private PolicyType policyType;
    private PolicyCycle policyCycle;
    private PolicyDirection policyDirection;
    private PolicyStatus policyStatus;
    private ZonedDateTime createTime;
    private ZonedDateTime entryTime;
    private ZonedDateTime exitTime;
    private Float entryPoint;
    private Float exitPoint;
    private Float realEntryPoint;
    private Float realExitPoint;
    private String reason;
    private Boolean pushPolicyFlag;
    private String creator;
    private String team;

    public Float getRealEntryPoint() {
        return realEntryPoint;
    }

    public void setRealEntryPoint(Float realEntryPoint) {
        this.realEntryPoint = realEntryPoint;
    }

    public Float getRealExitPoint() {
        return realExitPoint;
    }

    public void setRealExitPoint(Float realExitPoint) {
        this.realExitPoint = realExitPoint;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PolicyType getPolicyType() {
        return policyType;
    }

    public void setPolicyType(PolicyType policyType) {
        this.policyType = policyType;
    }

    public PolicyCycle getPolicyCycle() {
        return policyCycle;
    }

    public void setPolicyCycle(PolicyCycle policyCycle) {
        this.policyCycle = policyCycle;
    }

    public PolicyDirection getPolicyDirection() {
        return policyDirection;
    }

    public void setPolicyDirection(PolicyDirection policyDirection) {
        this.policyDirection = policyDirection;
    }

    public PolicyStatus getPolicyStatus() {
        return policyStatus;
    }

    public void setPolicyStatus(PolicyStatus policyStatus) {
        this.policyStatus = policyStatus;
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

    public Boolean getPushPolicyFlag() {
        return pushPolicyFlag;
    }

    public void setPushPolicyFlag(Boolean pushPolicyFlag) {
        this.pushPolicyFlag = pushPolicyFlag;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    @Override
    public String toString() {
        return "PolicyVM{" +
            "id=" + id +
            ", policyType=" + policyType +
            ", policyCycle=" + policyCycle +
            ", policyDirection=" + policyDirection +
            ", policyStatus=" + policyStatus +
            ", createTime=" + createTime +
            ", entryTime=" + entryTime +
            ", exitTime=" + exitTime +
            ", entryPoint=" + entryPoint +
            ", exitPoint=" + exitPoint +
            ", realEntryPoint=" + realEntryPoint +
            ", realExitPoint=" + realExitPoint +
            ", reason='" + reason + '\'' +
            ", pushPolicyFlag=" + pushPolicyFlag +
            ", creator='" + creator + '\'' +
            ", team='" + team + '\'' +
            '}';
    }
}
