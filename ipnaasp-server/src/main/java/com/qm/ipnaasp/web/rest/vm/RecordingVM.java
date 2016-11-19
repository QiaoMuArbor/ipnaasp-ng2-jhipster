package com.qm.ipnaasp.web.rest.vm;

import com.qm.ipnaasp.domain.enumeration.RecordingType;

/**
 * Created by Administrator on 2016/11/19.
 */
public class RecordingVM {

    private Long id;
    private RecordingType type;
    private String content;
//    private ZonedDateTime recordingTime;
//    private User recorder;
    private Long policyID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RecordingType getType() {
        return type;
    }

    public void setType(RecordingType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getPolicyID() {
        return policyID;
    }

    public void setPolicyID(Long policyID) {
        this.policyID = policyID;
    }

    @Override
    public String toString() {
        return "RecordingVM{" +
            "id=" + id +
            ", type=" + type +
            ", content='" + content + '\'' +
            ", policyID=" + policyID +
            '}';
    }
}
