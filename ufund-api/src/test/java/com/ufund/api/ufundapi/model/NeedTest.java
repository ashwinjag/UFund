package com.ufund.api.ufundapi.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

/**
 * Test the UFund File Need class
 * 
 * @author Aditya Kumar, Ashwin Jagadeesh, Soban Mahmud, Jonathan Li
 */

public class NeedTest {
    @Test
    public void testGetType(){
        // Setup
        Need need = new Need(2, "pencil", 1, 1, null);
        // invoke 
        String actual = need.getType();
        String expected = null;

        //analyze 
        assertEquals(expected, actual);
    }

    @Test 
    public void testGetName(){  
        Need need = new Need(2, "pencil", 1, 1, null);
        String actual = need.getName();
        String expected = "pencil";

        assertEquals(expected, actual);
    }

    @Test 
    public void testGetQuantity(){  
        Need need = new Need(2, "pencil", 1, 1, null);
        int actual = need.getQuantity();
        int expected = 1;

        assertEquals(expected, actual);
    }

    @Test 
    public void testGetCost(){  
        Need need = new Need(2, "pencil", 1, 1, null);
        double actual = need.getCost();
        double expected = 1;

        assertEquals(expected, actual);
    }

    @Test 
    public void testGetId(){  
        Need need = new Need(2, "pencil", 1, 1, null);
        int actual = need.getId();
        int expected = 2;

        assertEquals(expected, actual);
    }

    @Test
    public void testSetCost() {
        // Setup
        
        Need need = new Need(2, "pencil", 1, 1, "pen");

        // Invoke
        double expected_cost = 4;
        need.setCost(expected_cost);

        // Analyze
        assertEquals(expected_cost, need.getCost());
    }


    @Test
    public void testSetName() {
        // Setup
        
        Need need = new Need(2, "pencil", 1, 1, "pen");

        // Invoke
        String expected_name = "Book";
        need.setName(expected_name);

        // Analyze
        assertEquals(expected_name, need.getName());
    }

    @Test
    public void testSetQuantity() {
        // Setup
        
        Need need = new Need(2, "pencil", 1, 1, "pen");

        // Invoke
        int expected_quantity = 5;
        need.setQuantity(expected_quantity);

        // Analyze
        assertEquals(expected_quantity, need.getQuantity());
    }

    @Test
    public void testSetType() {
        // Setup
        
        Need need = new Need(2, "pencil", 1, 1, "pen");

        // Invoke
        String expected_type = "Book";

        need.setType(expected_type);

        // Analyze
        assertEquals(expected_type, need.getType());
    }
    
    @Test
    public void testToString() {
        // Setup
        int id = 99;
        String name = "Wi-Fire";
        double cost  = 2;
        int quantity = 3;
        String type = "Notebook";

        String expected_string = String.format(Need.STRING_FORMAT, id, name, cost, quantity, type);
        
        
        Need need = new Need(id, name, cost, quantity, type);

        // Invoke
        String actual_string = need.toString();

        // Analyze
        assertEquals(expected_string,actual_string);
    }

}
