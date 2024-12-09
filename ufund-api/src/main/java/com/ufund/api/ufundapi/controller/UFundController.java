package com.ufund.api.ufundapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ufund.api.ufundapi.persistence.UFundDAO;
import com.ufund.api.ufundapi.model.Need;

/**
 * Handles the REST API requests for the Controller resource
 * <p>
 * {@literal @}RestController Spring annotation identifies this class as a REST API
 * method handler to the Spring framework
 * 
 * @author Jonathan Li
 */

@RestController
@RequestMapping("needs") //Change this later
public class UFundController {
    private static final Logger LOG = Logger.getLogger(UFundController.class.getName());
    private UFundDAO ufundDao;

    /**
     * Creates a REST API controller to reponds to requests
     * 
     * @param ufundDao The {@link UFundDAO need Data Access Object} to perform CRUD operations
     * <br>
     * This dependency is injected by the Spring Framework
     */
    public UFundController(UFundDAO ufundDao) {
        this.ufundDao = ufundDao;
    }

    /**
     * Responds to the GET request for a {@linkplain Need need} for the given id
     * 
     * @param id The id used to locate the {@link Need need}
     * 
     * @return ResponseEntity with {@link Need need} object and HTTP status of OK if found<br>
     * ResponseEntity with HTTP status of NOT_FOUND if not found<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("/{id}") //Change to add other variables if necessary
    public ResponseEntity<Need> getNeeds(@PathVariable int id) {
        LOG.info("GET /needs/" + id);
        try {
            Need ufund = ufundDao.getNeed(id);
            if (ufund != null)
                return new ResponseEntity<Need>(ufund,HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch(IOException e) {
            LOG.log(Level.SEVERE,e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Responds to the GET request for all {@linkplain Need needsList}
     * 
     * @return ResponseEntity with array of {@link Need need} objects (may be empty) and
     * HTTP status of OK<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("")
    public ResponseEntity<Need[]> getNeeds() {
        LOG.info("GET /needs");

        try {
            Need needsList[] = ufundDao.getNeeds();
            if (needsList != null)
                return new ResponseEntity<Need[]>(needsList,HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }
        catch(IOException e) {
            LOG.log(Level.SEVERE,e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Responds to the GET request for all {@linkplain Need needsList} whose name contains
     * the text in name
     * 
     * @param name The name parameter which contains the text used to find the {@link Need needsList}
     * 
     * @return ResponseEntity with array of {@link Need need} objects (may be empty) and
     * HTTP status of OK<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     * <p>
     * Example: Find all needs that contain the text "ma"
     * GET http://localhost:8080/needs/?name=ma
     */
    @GetMapping("/")
    public ResponseEntity<Need[]> searchNeeds(@RequestParam String name) {
        LOG.info("GET /needs/?name="+name);

        try {
            Need needs_name[] = ufundDao.findNeeds(name);

            if (needs_name != null)
                return new ResponseEntity<Need[]>(needs_name,HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }
        catch(IOException e) {
            LOG.log(Level.SEVERE,e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Creates a {@linkplain Need need} with the provided need object
     * 
     * @param need - The {@link Need need} to create
     * 
     * @return ResponseEntity with created {@link Need need} object and HTTP status of CREATED<br>
     * ResponseEntity with HTTP status of CONFLICT if {@link Need need} object already exists<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PostMapping("")
    public ResponseEntity<Need> createNeed(@RequestBody Need need) {
        LOG.info("POST /needs " + need);

        try {
            Need needs_create = ufundDao.createNeed(need);

            if (needs_create != null)
                return new ResponseEntity<Need>(needs_create,HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }
        catch(IOException e) {
            LOG.log(Level.SEVERE,e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Updates the {@linkplain Need need} with the provided {@linkplain Need need} object, if it exists
     * 
     * @param need The {@link Need need} to update
     * 
     * @return ResponseEntity with updated {@link Need need} object and HTTP status of OK if updated<br>
     * ResponseEntity with HTTP status of NOT_FOUND if not found<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PutMapping("")
    public ResponseEntity<Need> updateNeed(@RequestBody Need need) {
        LOG.info("PUT /needs " + need);

        try {
            Need needs_update = ufundDao.updateNeed(need);

            if (needs_update != null)
                return new ResponseEntity<Need>(needs_update,HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }
        catch(IOException e) {
            LOG.log(Level.SEVERE,e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Deletes a {@linkplain Need need} with the given id
     * 
     * @param id The id of the {@link Need need} to deleted
     * 
     * @return ResponseEntity HTTP status of OK if deleted<br>
     * ResponseEntity with HTTP status of NOT_FOUND if not found<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Need> deleteNeed(@PathVariable int id) {
        LOG.info("DELETE /needs/" + id);

        try {
            boolean needs_delete = ufundDao.deleteNeed(id);

            if (needs_delete != false)
                return new ResponseEntity<Need>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            
        }
        catch(IOException e) {
            LOG.log(Level.SEVERE,e.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
