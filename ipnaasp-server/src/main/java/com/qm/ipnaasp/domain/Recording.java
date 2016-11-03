package com.qm.ipnaasp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.qm.ipnaasp.domain.enumeration.RecordingType;

/**
 * A Recording.
 */
@Entity
@Table(name = "recording")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Recording implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private RecordingType type;

    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "recording_time", nullable = false)
    private ZonedDateTime recordingTime;

    @ManyToOne
    @NotNull
    private User recorder;

    @ManyToOne
    @NotNull
    private Policy policy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RecordingType getType() {
        return type;
    }

    public Recording type(RecordingType type) {
        this.type = type;
        return this;
    }

    public void setType(RecordingType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public Recording content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ZonedDateTime getRecordingTime() {
        return recordingTime;
    }

    public Recording recordingTime(ZonedDateTime recordingTime) {
        this.recordingTime = recordingTime;
        return this;
    }

    public void setRecordingTime(ZonedDateTime recordingTime) {
        this.recordingTime = recordingTime;
    }

    public User getRecorder() {
        return recorder;
    }

    public Recording recorder(User user) {
        this.recorder = user;
        return this;
    }

    public void setRecorder(User user) {
        this.recorder = user;
    }

    public Policy getPolicy() {
        return policy;
    }

    public Recording policy(Policy policy) {
        this.policy = policy;
        return this;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Recording recording = (Recording) o;
        if(recording.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, recording.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Recording{" +
            "id=" + id +
            ", type='" + type + "'" +
            ", content='" + content + "'" +
            ", recordingTime='" + recordingTime + "'" +
            '}';
    }
}
