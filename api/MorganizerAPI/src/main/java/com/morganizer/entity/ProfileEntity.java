package com.morganizer.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;

@Entity(name="profile")
public class ProfileEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long profileId;

    private String name;
    private String email;
    private String phoneNumber;
    private String gender;
    private String birthdate;
    private String color;
    
    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName = "user_id")
    private UserDetailsEntity user;
    private boolean selected;

	@ManyToMany
	@JoinColumn(name = "reminder", referencedColumnName = "reminder_id")
	private List<EventReminderEntity> reminderList = new ArrayList<>();
    
    public ProfileEntity() {
    	
    }
    
    
	public ProfileEntity(String name, String email, String phoneNumber, String gender, String birthdate, String color,
			UserDetailsEntity user, boolean selected, List<EventReminderEntity> reminderList) {
		super();
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.gender = gender;
		this.birthdate = birthdate;
		this.color = color;
		this.user = user;
		this.selected = selected;
		this.reminderList = reminderList;
	}


	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public UserDetailsEntity getUser() {
		return user;
	}

	public void setUser(UserDetailsEntity user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	
	public List<EventReminderEntity> getReminderList() {
		return reminderList;
	}

	public void setReminderList(List<EventReminderEntity> reminderList) {
		this.reminderList = reminderList;
	}
	
    
    

}
