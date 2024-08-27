package com.springboot.heart.service;

import com.springboot.auth.utils.Principal;
import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.balancegame.repository.BalanceGameRepository;
import com.springboot.comment.entity.Comment;
import com.springboot.comment.repository.CommentRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.heart.entity.Heart;
import com.springboot.heart.repository.HeartRepository;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.imagegame.repository.ImageGameRepository;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.post.entity.Post;
import com.springboot.post.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class HeartService {
    private final HeartRepository heartRepository;
    private final MemberService memberService;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final ImageGameRepository imageGameRepository;
    private final BalanceGameRepository balanceGameRepository;

    public HeartService(HeartRepository heartRepository, MemberService memberService, PostRepository postRepository, CommentRepository commentRepository, ImageGameRepository imageGameRepository, BalanceGameRepository balanceGameRepository) {
        this.heartRepository = heartRepository;
        this.memberService = memberService;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.imageGameRepository = imageGameRepository;
        this.balanceGameRepository = balanceGameRepository;
    }

    @Transactional
    public void toggleHeart(Authentication authentication, Long contentId, Heart.ContentType contentType) {
        Principal principal = (Principal) authentication.getPrincipal();
        Member findMember = memberService.findMember(principal.getMemberId());

        Object content = findContentByIdAndType(contentId, contentType);
        if (content == null) {
            throw new IllegalArgumentException("Content not found, ContentType: " + contentType + ", ContentId: " + contentId);
        }

        Optional<Heart> existingHeart = findExistingHeart(findMember, content, contentType);

        if (existingHeart.isPresent()) {
            heartRepository.delete(existingHeart.get());
        } else {
            Heart heart = new Heart();
            heart.setMember(findMember);
            heart.setContentType(contentType);
            setHeartContent(heart, contentType, content);
            heartRepository.save(heart);
        }
    }

    public List<Heart> getLikesByMember(Authentication authentication) {
        Principal principal = (Principal) authentication.getPrincipal();
        return heartRepository.findByMember_MemberId(principal.getMemberId());
    }

    private Object findContentByIdAndType(Long contentId, Heart.ContentType contentType) {
        switch (contentType) {
            case POST:
                return postRepository.findById(contentId)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
            case COMMENT:
                return commentRepository.findById(contentId)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            case IMAGE_GAME:
                return imageGameRepository.findById(contentId)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GAME_NOT_FOUND));
            case BALANCE_GAME:
                return balanceGameRepository.findById(contentId)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.GAME_NOT_FOUND));
            default:
                throw new IllegalArgumentException("Unsupported content type: " + contentType);
        }
    }

    private Optional<Heart> findExistingHeart(Member member, Object content, Heart.ContentType contentType) {
        switch (contentType) {
            case POST:
                return heartRepository.findByMemberAndPost(member, (Post) content);
            case COMMENT:
                return heartRepository.findByMemberAndComment(member, (Comment) content);
            case IMAGE_GAME:
                return heartRepository.findByMemberAndImageGame(member, (ImageGame) content);
            case BALANCE_GAME:
                return heartRepository.findByMemberAndBalanceGame(member, (BalanceGame) content);
            default:
                throw new IllegalArgumentException("Type Not Found");
        }
    }

    private void setHeartContent(Heart heart, Heart.ContentType contentType, Object content) {
        switch (contentType) {
            case POST:
                heart.setPost((Post) content);
                break;
            case COMMENT:
                heart.setComment((Comment) content);
                break;
            case IMAGE_GAME:
                heart.setImageGame((ImageGame) content);
                break;
            case BALANCE_GAME:
                heart.setBalanceGame((BalanceGame) content);
                break;
            default:
                throw new IllegalArgumentException("Type Not Found");
        }
    }
    public <T> Page<T> getLikedContentByMember(Member member, int page, int size, Heart.ContentType type) {
        PageRequest pageRequest = PageRequest.of(page, size);

        switch (type.toString().toLowerCase()) {
            case "post":
                return (Page<T>) heartRepository.findLikedPostsByMember(member, pageRequest);
            case "comment":
                return (Page<T>) heartRepository.findLikedCommentsByMember(member, pageRequest);
            case "image_game":
                return (Page<T>) heartRepository.findLikedImageGamesByMember(member, pageRequest);
            case "balance_game":
                return (Page<T>) heartRepository.findLikedBalanceGamesByMember(member, pageRequest);
            default:
                throw new BusinessLogicException(ExceptionCode.CONTENT_NOT_FOUND);
        }
    }
}