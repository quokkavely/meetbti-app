package com.springboot.post.mapper;

import com.springboot.post.dto.PostDto;
import com.springboot.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {
    Post postCreateDtoToPost (PostDto.Create create);
    Post postUpdateDtoToPost (PostDto.Update update);
    PostDto.Response postToPostResponseDto (Post post);
    List<PostDto.Response> postsToPostResponseDtos (List<Post> posts);
}
