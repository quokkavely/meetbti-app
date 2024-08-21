package com.springboot.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {
    public static URI createUri(String defaultUri, long resourceId){
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUri + "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }
}
