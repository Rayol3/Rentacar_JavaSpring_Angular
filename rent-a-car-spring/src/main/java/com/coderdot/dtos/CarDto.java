package com.coderdot.dtos;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class CarDto {


    private Long id;

    private String name;

    private String color;

    private String transmission;

    private String brand;

    private String type;

    private Date modelYear;

    private String description;

    private Integer price;

    private MultipartFile image; // Use MultipartFile for file upload
    
    private byte[] returnedImage;
}
