package com.springboot.post.service;

import com.springboot.auth.utils.Principal;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.post.entity.Post;
import com.springboot.post.entity.View;
import com.springboot.post.repository.PostRepository;
import com.springboot.post.repository.ViewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final MemberService memberService;
    private final ViewRepository viewRepository;

    public PostService(PostRepository postRepository, MemberService memberService, ViewRepository viewRepository) {
        this.postRepository = postRepository;
        this.memberService = memberService;
        this.viewRepository = viewRepository;
    }
    //게시글을 생성하는 메서드
    public Post createPost(Post post, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Member findMember = memberService.findMember(principal.getMemberId());

        if (principal.getMemberId() == 0) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        post.setMember(findMember);

        return postRepository.save(post);
    }
    //게시글을 수정하는 메서드
    public Post updatePost(Post post, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Post findPost = findVerifiedPost(post.getPostId());

        if (principal.getMemberId() != findPost.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContent())
                .ifPresent(content -> findPost.setContent(content));
        Optional.ofNullable(post.getImage())
                .ifPresent(image -> findPost.setImage(image));

        return postRepository.save(findPost);
    }
    //게시글을 조회하는 메서드
    public Post findPost(long postId, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Post post = findVerifiedPost(postId);

        if (principal.getMemberId() == 0) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }
        if (post.getPostStatus() == Post.PostStatus.DELETED) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }
        createView(postId,authentication);

        return findVerifiedPost(postId);
    }
    //게시글 전부를 조회하는 메서드
    public Page<Post> findPosts(int page, int size, String standard, String category) {
        Pageable pageable = createPageable(page, size, standard);

        if (category.equals("all")) {
            return postRepository.findByPostStatusNot(pageable, Post.PostStatus.DELETED);
        } else {
            return postRepository.findByCategoryAndPostStatusNot(pageable, category, Post.PostStatus.DELETED);
        }
    }
    //게시글을 삭제하는 메서드
    public void deletePost(long postId, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Post post = findVerifiedPost(postId);

        if (principal.getMemberId() != post.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_DENIED);
        }

        post.setPostStatus(Post.PostStatus.DELETED);

        postRepository.save(post);
    }
    //게시글이 DB에 존재하는지 확인하는 메서드
    private Post findVerifiedPost(long postId) {
        Optional<Post> post = postRepository.findById(postId);

        return post.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }
    //정렬기준으로 페이지를 만드는 메서드
    private Pageable createPageable(int page, int size, String standard) {
        Sort sort = Sort.by(standard).descending();

        return PageRequest.of(page, size, sort);
    }
    //조회를 생성하는 메서드
    private void createView(long postId, Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();

        Post findPost = findVerifiedPost(postId);

        Member findMember = memberService.findMember(principal.getMemberId());

        Optional<View> optionalRead = viewRepository.findByMemberAndPost(findMember,findPost);

        if (optionalRead.isPresent()) {

        } else {
            View addView = new View();
            addView.setPost(findPost);
            addView.setMember(findMember);
            viewRepository.save(addView);
        }
    }
}
