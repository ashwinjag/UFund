package com.ufund.api.ufundapi.model;

import java.util.logging.Logger;

import com.fasterxml.jackson.annotation.JsonProperty;
/**
 * Represents a Need entity
 * 
 * @author Soban
 */
public class Need {
    private static final Logger LOG = Logger.getLogger(Need.class.getName());

    static final String STRING_FORMAT = "Need [id=%d, name=%s, cost=%.2f, quantity=%d, type=%s]";

    @JsonProperty("id") private int id;
    @JsonProperty("name") private String name;
    @JsonProperty("cost") private double cost;
    @JsonProperty("quantity") private int quantity;
    @JsonProperty("type") private String type;

    /**
     * Creates need with the given parameters
     * @param id the id of the need
     * @param name the name of the need
     * @param cost the cost of the need
     * @param quantity the amount of that need
     * @param type is the type of need
     */
    public Need(@JsonProperty("id") int id, @JsonProperty("name") String name, 
    @JsonProperty("cost") double cost, @JsonProperty("quantity") int quantity, @JsonProperty("type") String type){
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.quantity = quantity;
        this.type = type; 
    }

    /**
     * gets the id from a need
     * @return the id of the need
     */
    public int getId(){return id; }

    /**
     * gets the name from a need
     * @return the name of the need
     */
    public String getName(){return name;}

    /**
     * gets the cost from a need
     * @return the cost of the need
     */
    public double getCost(){return cost;}

    /**
     * gets the quantity from a need
     * @return the quantity of the need
     */
    public int getQuantity(){return quantity;}

    /**
     * gets the type from a need
     * @return the type of the need
     */
    public String getType(){return type;}

    /**
     * sets the name from a need
     * @param name The new name of the need
     */
    public void setName(String name){this.name = name;}

    /**
     * sets the cost from a need
     * @param cost The new cost of the need
     */
    public void setCost(double cost){this.cost = cost;}

    /**
     * sets the quantity from a need
     * @param cost The quantity cost of the need
     */
    public void setQuantity(int quantity){this.quantity = quantity;}

    /**
     * sets the tyope from a need
     * @param cost The new type of the need
     */
    public void setType(String type){this.type = type;}

    /**
     * displays string representation of a need
     * @returns the string representation of a need object
     */
    @Override
    public String toString(){
        return String.format(STRING_FORMAT, id, name, cost, quantity, type);
    }
}