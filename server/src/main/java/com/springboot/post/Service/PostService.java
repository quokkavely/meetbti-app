package com.springboot.post.service;

import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.post.entity.Post;
import com.springboot.post.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post createPost (Post post) {

        return postRepository.save(post);
    }
    public Post updatePost (Post post) {
        Post findPost = findPost(post.getPostId());

        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContent())
                .ifPresent(content -> findPost.setContent(content));
        Optional.ofNullable(post.getImage())
                .ifPresent(image -> findPost.setImage(image));

        return postRepository.save(findPost);
    }
    public Post findPost (long postId) {
        Post post = findVerifiedPost(postId);

        if (post.getPostStatus() == Post.PostStatus.POST_DELETED) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }

        return findVerifiedPost(postId);
    }
    public Page<Post> findPosts (int page, int size, String standard, String category) {
        Pageable pageable = createPageable(page, size, standard);

        return postRepository.findByCategory(pageable,category);
    }
    public void deletePost (long postId) {
        Post post = findPost(postId);

        post.setPostStatus(Post.PostStatus.POST_DELETED);

        postRepository.save(post);
    }
    private Post findVerifiedPost (long postId) {
        Optional<Post> post = postRepository.findById(postId);

        return post.orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }
    private Pageable createPageable (int page, int size, String standard) {
        Sort sort = Sort.by(standard).descending();

        return PageRequest.of(page, size, sort);
    }
    private void createView (long postId) {

    }
}
