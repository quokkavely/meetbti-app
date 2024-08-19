package com.springboot.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {
    public static URI createUri(String defualtUri, long resourceId){
        return UriComponentsBuilder
                .newInstance()
                .path(defualtUri + "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }
}
