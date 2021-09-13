package com.morganizer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.morganizer.dto.CalendarRequest;
import com.morganizer.dto.CalendarResponse;
import com.morganizer.service.CalendarService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/calendar")

//this class controls all calendar related api calls
public class CalendarController {

    //dependency injection: whenever CalendarController is created, calendarService is created too. no need for "new" keyword
    @Autowired
    CalendarService calendarService;
    
    //returns a list of calendar for that user
    @GetMapping("/fetchAll/{userId}")
    public List<CalendarResponse> fetchAll(@PathVariable Long userId) {
        return calendarService.fetchAll(userId);
    }
    
    //adds a calendar based on the CalendarRequest for a certain user
    @PostMapping("/add")
    public List<CalendarResponse> addCalendar(@RequestBody CalendarRequest calendarRequest) {
    	return calendarService.saveCalendar(calendarRequest);
    }
    
    //removes a calendar based on the calendarID
    @DeleteMapping("/remove/{calendarId}")
    public void deleteEvent(@PathVariable Long calendarId) {
    	calendarService.deleteCalendar(calendarId);
    }
}
