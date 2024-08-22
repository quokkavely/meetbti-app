package com.springboot.heart.mapper;

import com.springboot.balancegame.entity.BalanceGame;
import com.springboot.comment.entity.Comment;
import com.springboot.heart.dto.HeartResponseDto;
import com.springboot.imagegame.entity.ImageGame;
import com.springboot.post.entity.Post;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface HeartMapper {
     HeartResponseDto.PostHeartResponse postToPostHeartResponseDto(Post post);
     HeartResponseDto.CommentHeartResponse commentToCommentHeartResponseDto(Comment comment);
     HeartResponseDto.ImageGameHeartResponse imageGameToImageGameHeartResponseDto(ImageGame imageGame);
     HeartResponseDto.BalanceGameHeartResponse BalanceGameToBalanceGameHeartResponseDto(BalanceGame balanceGame);
}
