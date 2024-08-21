package com.springboot.heart.service;//package com.springboot.heart.service;
//
//
//import com.springboot.balancegame.entity.BalanceGame;
//import com.springboot.balancegame.service.BalanceGameService;
//import com.springboot.comment.entity.Comment;
//import com.springboot.comment.service.CommentService;
//import com.springboot.heart.entity.*;
//import com.springboot.heart.repository.HeartRepository;
//import com.springboot.imagegame.entity.ImageGame;
//import com.springboot.imagegame.service.ImageGameService;
//import com.springboot.member.entity.Member;
//import com.springboot.post.entity.Post;
//import com.springboot.post.service.PostService;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Service;
//
//import javax.persistence.EntityNotFoundException;
//import javax.transaction.Transactional;
//import java.util.List;
//import java.util.Optional;
//
//
//@Service
//public class HeartService {
//    private final HeartRepository repository;
//    private final ImageGameService imageGameService;
//    private final BalanceGameService balanceGameService;
//    private final PostService postService;
//    private final CommentService commentService;
//
//    public HeartService(HeartRepository repository, ImageGameService imageGameService,
//                        BalanceGameService balanceGameService, PostService postService, CommentService commentService) {
//        this.repository = repository;
//        this.imageGameService = imageGameService;
//        this.balanceGameService = balanceGameService;
//        this.postService = postService;
//        this.commentService = commentService;
//    }
//
//    @Transactional
//    public void toggleHeart(Authentication authentication, String type, Long targetId) {
//        Member member = (Member) authentication.getPrincipal();
//        Optional<Heart> existingHeart = repository
//                .findByMemberIdAndTypeAndTargetId(member.getMemberId(), type, targetId);
//
//        if (existingHeart.isPresent()) {
//            repository.delete(existingHeart.get());
//        } else {
//            Heart heart = createHeart(member, type, targetId);
//            repository.save(heart);
//        }
//    }
//
//    private Heart createHeart(Member member, String type, Long targetId) {
//        switch (type.toUpperCase()) {
//            case "POST":
//                Post post = repository.findPostById(targetId);
//                return new PostHeart(member, post);
//            case "COMMENT":
//                Comment comment = findCommentById(targetId);
//                return new CommentHeart(member, comment);
//            case "IMAGEGAME":
//                ImageGame imageGame = findImageGameById(targetId);
//                return new ImageGameHeart(member, imageGame);
//            case "BALANCEGAME":
//                BalanceGame balanceGame = findBalanceGameById(targetId);
//                return new BalanceGameHeart(member, balanceGame);
//            default:
//                throw new EntityNotFoundException("heart type Not Found: " + type);
//        }
//    }
//
//    public List<Heart> getHeartsByMember(Authentication authentication) {
//        Member member = (Member) authentication.getPrincipal();
//        return repository.findByMemberId(member.getMemberId());
//    }
//
//    private Post findPostById(Long postId) {
//        return postService.findVerifiedPost(postId)
//                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));
//    }
//
//    private Comment findCommentById(Long commentId) {
//        return commentService.findVerifiedComment(commentId)
//                .orElseThrow(() -> new IllegalArgumentException("Comment not found with id: " + commentId));
//    }
//
//    private ImageGame findImageById(Long imageGameId) {
//        return imageGameService.findVerifiedGame(imageGameId)
//                .orElseThrow(() -> new IllegalArgumentException("ImageGame not found: " + imageGameId));
//    }
//
//    private BalanceGame findBalanceById(Long balanceGameId) {
//        return imageGameService.findVerifiedGame(balanceGameId)
//                .orElseThrow(() -> new IllegalArgumentException("BalanceGame not found: " + balanceGameId));
//    }
//
//}
