package com.ufund.api.ufundapi.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;

import com.ufund.api.ufundapi.persistence.UFundDAO;
import com.ufund.api.ufundapi.model.Need;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.junit.jupiter.api.Tag;

/**
 * @author Soban, Aditya, Ashwin, Jonathon
 */
@Tag("Controller-Tier")
public class UFundControllerTest {
    private UFundController uFundController;
    private UFundDAO mockUFundDAO;

    @BeforeEach
    public void setupUfundController() {
        mockUFundDAO = mock(UFundDAO.class);
        uFundController = new UFundController(mockUFundDAO);
    }

    @Test
    public void testGetNeeds() throws IOException {
        Need need = new Need(99, "picture book", 10.99, 2, "book");

        when(mockUFundDAO.getNeed(need.getId())).thenReturn(need);

        ResponseEntity<Need> response = uFundController.getNeeds(need.getId());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(need, response.getBody());
    }

    @Test
    public void testgetNeedNotFound() throws Exception { // createNeed may throw IOException
        // Setup
        int needId = 99;

        // When the same id is passed in, our mock Need DAO will return null, simulating
        // no Need found
        when(mockUFundDAO.getNeed(needId)).thenReturn(null);

        // Invoke
        ResponseEntity<Need> response = uFundController.getNeeds(needId);

        // Analyze
        assertEquals(HttpStatus.NOT_FOUND,response.getStatusCode());
    }

    @Test
    public void testGetNeedHandleException() throws Exception { // createNeed may throw IOException
        // Setup
        int needId = 99;
        // When getNeed is called on the Mock Need DAO, throw an IOException
        doThrow(new IOException()).when(mockUFundDAO).getNeed(needId);

        // Invoke
        ResponseEntity<Need> response = uFundController.getNeeds(needId);

        // Analyze
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,response.getStatusCode());
    }

    /*****************************************************************
     * The following tests will fail until all UFundController methods
     * are implemented.
     ****************************************************************/

    @Test
    public void testCreateNeed() throws IOException {  // createNeed may throw IOException
        // Setup
        Need need = new Need(99, "picture book", 10.99, 2, "book");
        // when createNeed is called, return true simulating successful
        // creation and save
        when(mockUFundDAO.createNeed(need)).thenReturn(need);

        // Invoke
        ResponseEntity<Need> response = uFundController.createNeed(need);

        // Analyze
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals(need,response.getBody());
    }

    @Test
    public void testCreateNeedFailed() throws IOException {  // createNeed may throw IOException
        // Setup
        Need need = new Need(99, "red packback", 21.99, 5, "backpack");
        // when createNeed is called, return false simulating failed
        // creation and save
        when(mockUFundDAO.createNeed(need)).thenReturn(null);

        // Invoke
        ResponseEntity<Need> response = uFundController.createNeed(need);

        // Analyze
        assertEquals(HttpStatus.NOT_FOUND,response.getStatusCode());
    }

    @Test
    public void testCreateNeedHandleException() throws IOException {  // createNeed may throw IOException
        // Setup
        Need need = new Need(99, "no. 2 pencil", 1.00, 100, "pencil");

        // When createNeed is called on the Mock Need DAO, throw an IOException
        doThrow(new IOException()).when(mockUFundDAO).createNeed(need);

        // Invoke
        ResponseEntity<Need> response = uFundController.createNeed(need);

        // Analyze
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,response.getStatusCode());
    }

    @Test
    public void testUpdateNeed() throws IOException { // updateNeed may throw IOException
        // Setup
        Need need = new Need(99, "blue pen", 1.00 , 10, "pen");
        // when updateNeed is called, return true simulating successful
        // update and save
        when(mockUFundDAO.updateNeed(need)).thenReturn(need);
        ResponseEntity<Need> response = uFundController.updateNeed(need);
        need.setName("black pen");

        // Invoke
        response = uFundController.updateNeed(need);

        // Analyze
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals(need,response.getBody());
    }

    @Test
    public void testUpdateNeedFailed() throws IOException { // updateNeed may throw IOException
        // Setup
        Need need = new Need(99, "red pen", 1.00, 5, "pen");
        // when updateNeed is called, return true simulating successful
        // update and save
        when(mockUFundDAO.updateNeed(need)).thenReturn(null);

        // Invoke
        ResponseEntity<Need> response = uFundController.updateNeed(need);

        // Analyze
        assertEquals(HttpStatus.NOT_FOUND,response.getStatusCode());
    }

    @Test
    public void testUpdateNeedHandleException() throws IOException { // updateNeed may throw IOException
        // Setup
        Need need = new Need(99, "red pen", 1.00, 10, "pen");
        // When updateNeed is called on the Mock Need DAO, throw an IOException
        doThrow(new IOException()).when(mockUFundDAO).updateNeed(need);

        // Invoke
        ResponseEntity<Need> response = uFundController.updateNeed(need);

        // Analyze
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,response.getStatusCode());
    }

    @Test
    public void testgetNeeds() throws IOException { // getNeedes may throw IOException
        // Setup
        Need[] needs = new Need[2];
        needs[0] = new Need(99, "black pen", 1.00, 10, "pen");
        needs[1] = new Need(100, "blue pen", 1.00, 15, "pen");
        // When getNeedes is called return the Needes created above
        when(mockUFundDAO.getNeeds()).thenReturn(needs);

        // Invoke
        ResponseEntity<Need[]> response = uFundController.getNeeds();

        // Analyze
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals(needs,response.getBody());
    }

    @Test
    public void testgetNeedsHandleException() throws IOException { // getNeeds may throw IOException
        // Setup
        // When getNeedes is called on the Mock Need DAO, throw an IOException
        doThrow(new IOException()).when(mockUFundDAO).getNeeds();

        // Invoke
        ResponseEntity<Need[]> response = uFundController.getNeeds();

        // Analyze
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,response.getStatusCode());
    }

    @Test
    public void testSearchNeeds() throws IOException { // findNeedes may throw IOException
        // Setup
        String searchString = "pe";
        Need[] needs = new Need[2];
        needs[0] = new Need(99, "red pen", 1.05, 10, "pen");
        needs[1] = new Need(100, "purple pen", 1.20, 1, "pen");
        // When findNeedes is called with the search string, return the two
        /// Needes above
        when(mockUFundDAO.findNeeds(searchString)).thenReturn(needs);

        // Invoke
        ResponseEntity<Need[]> response = uFundController.searchNeeds(searchString);

        // Analyze
        assertEquals(HttpStatus.OK,response.getStatusCode());
        assertEquals(needs,response.getBody());
    }

    @Test
    public void testSearchNeedesHandleException() throws IOException { // findNeedes may throw IOException
        // Setup
        String searchString = "an";
        // When createNeed is called on the Mock Need DAO, throw an IOException
        doThrow(new IOException()).when(mockUFundDAO).findNeeds(searchString);

        // Invoke
        ResponseEntity<Need[]> response = uFundController.searchNeeds(searchString);

        // Analyze
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,response.getStatusCode());
    }

    @Test
    public void testDeleteNeed() throws IOException { // deleteNeed may throw IOException
        // Setup
        int needId = 99;
        // when deleteNeed is called return true, simulating successful deletion
        when(mockUFundDAO.deleteNeed(needId)).thenReturn(true);

        // Invoke
        ResponseEntity<Need> response = uFundController.deleteNeed(needId);

        // Analyze
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }

    @Test
    public void testDeleteNeedNotFound() throws IOException { // deleteNeed may throw IOException
        // Setup
        int needId = 99;
        // when deleteNeed is called return false, simulating failed deletion
        when(mockUFundDAO.deleteNeed(needId)).thenReturn(false);

        // Invoke
        ResponseEntity<Need> response = uFundController.deleteNeed(needId);

        // Analyze
        assertEquals(HttpStatus.NOT_FOUND,response.getStatusCode());
    }

    @Test
    public void testDeleteNeedHandleException() throws IOException { // deleteNeed may throw IOException
        // Setup
        int needId = 99;
        // When deleteNeed is called on the Mock Need DAO, throw an IOException
        doThrow(new IOException()).when(mockUFundDAO).deleteNeed(needId);

        // Invoke
        ResponseEntity<Need> response = uFundController.deleteNeed(needId);

        // Analyze
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,response.getStatusCode());
    }
}


