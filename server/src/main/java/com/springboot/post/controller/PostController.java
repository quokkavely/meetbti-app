package com.springboot.post.controller;

import com.springboot.auth.utils.Principal;
import com.springboot.comment.mapper.CommentMapper;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.post.dto.PostDto;
import com.springboot.post.entity.Post;
import com.springboot.post.mapper.PostMapper;
import com.springboot.post.service.PostService;
import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import com.springboot.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
public class PostController {
    private final PostService postService;
    private final PostMapper postMapper;
    private final MemberService memberService;
    private final CommentMapper commentMapper;
    private final static String POST_DEFAULT_URL = "/posts";

    public PostController(PostService postService, PostMapper postMapper, MemberService memberService, CommentMapper commentMapper) {
        this.postService = postService;
        this.postMapper = postMapper;
        this.memberService = memberService;
        this.commentMapper = commentMapper;
    }
    @PostMapping
    public ResponseEntity createPost (@Valid @RequestBody PostDto.Create createDto,
                                      Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        createDto.setCategory(findMember.getTestResults().get(findMember.getTestResults().size()-1).getMbti());

        Post post = postService.createPost(postMapper.postCreateDtoToPost(createDto), authentication);

        URI location = UriCreator.createUri(POST_DEFAULT_URL, post.getPostId());

        return ResponseEntity.created(location).build();
    }
    @PatchMapping("{post-id}")
    public ResponseEntity updatePost (@PathVariable("post-id") @Positive long postId,
                                      @Valid @RequestBody PostDto.Update updateDto,
                                      Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        updateDto.setPostId(postId);
//        updateDto.setMemberId(principal.getMemberId());

        Post post = postService.updatePost(postMapper.postUpdateDtoToPost(updateDto), authentication);

        return new ResponseEntity(new SingleResponseDto<>(postMapper.postToPostPatchResponseDto(post)), HttpStatus.OK);
    }

    @GetMapping("{post-id}")
    public ResponseEntity getPost (@PathVariable("post-id") @Positive long postId,
                                   Authentication authentication) {
        Post post = postService.findPost(postId,authentication);

        return new ResponseEntity(new SingleResponseDto<>(postMapper.postToPostGetResponseDto(post,commentMapper)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPosts (@Positive @RequestParam int page,
                                    @Positive @RequestParam int size,
                                    @RequestParam(required = false) String category,
                                    @RequestParam String standard,
                                    Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        String selectCategory = category != null ? category : findMember.getTestResults().get(findMember.getTestResults().size()-1).getMbti();

        Page<Post> pagePosts = postService.findPosts(page, size, standard, selectCategory);

        List<Post> posts = pagePosts.getContent();

        return new ResponseEntity(new MultiResponseDto<>(postMapper.postsToPostResponseDtos(posts),pagePosts),HttpStatus.OK);
    }

    @DeleteMapping("{post-id}")
    public ResponseEntity deletePost (@PathVariable("post-id") @Positive long postId,
                                      Authentication authentication) {
        postService.deletePost(postId,authentication);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
