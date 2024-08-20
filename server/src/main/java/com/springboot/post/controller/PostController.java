package com.springboot.post.controller;

import com.springboot.auth.Principal;
import com.springboot.post.dto.PostDto;
import com.springboot.post.entity.Post;
import com.springboot.post.mapper.PostMapper;
import com.springboot.post.service.PostService;
import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
public class PostController {
    private final PostService postService;
    private final PostMapper postMapper;

    public PostController(PostService postService, PostMapper postMapper) {
        this.postService = postService;
        this.postMapper = postMapper;
    }
    @PostMapping
    public ResponseEntity createPost (@Valid @RequestBody PostDto.Create createDto) {
        Post post = postService.createPost(postMapper.postCreateDtoToPost(createDto));

        return new ResponseEntity(HttpStatus.CREATED);
    }
    @PatchMapping("{post-id}")
    public ResponseEntity updatePost (@PathVariable("post-id") @Positive long postId,
                                      @Valid @RequestBody PostDto.Update updateDto) {
        updateDto.setPostId(postId);

        Post post = postService.updatePost(postMapper.postUpdateDtoToPost(updateDto));

        return new ResponseEntity(new SingleResponseDto<>(postMapper.postToPostResponseDto(post)),HttpStatus.OK);
    }

    @GetMapping("{post-id}")
    public ResponseEntity getPost (@PathVariable("post-id") @Positive long postId) {
        Post post = postService.findPost(postId);

        return new ResponseEntity(new SingleResponseDto<>(postMapper.postToPostResponseDto(post)),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPosts (@Positive @RequestParam int page,
                                    @Positive @RequestParam int size,
                                    @RequestParam String standard,
                                    Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Page<Post> pagePosts = postService.findPosts(page, size, standard, principal.getMbti());

        List<Post> posts = pagePosts.getContent();

        return new ResponseEntity(new MultiResponseDto<>(postMapper.postsToPostResponseDtos(posts),pagePosts),HttpStatus.OK);
    }

    @DeleteMapping("{post-id}")
    public ResponseEntity deletePost (@PathVariable("post-id") @Positive long postId) {
        postService.deletePost(postId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
