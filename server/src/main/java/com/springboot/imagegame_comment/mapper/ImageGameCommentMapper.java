package com.springboot.imagegame_comment.mapper;


import com.springboot.imagegame_comment.dto.ImageGameCommentDto;
import com.springboot.imagegame_comment.entity.ImageGameComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ImageGameCommentMapper {
    @Mapping(source = "gameId", target = "imageGame.imageGameId")
    ImageGameComment postDtoToComment (ImageGameCommentDto.Post postDto);
    ImageGameComment patchDtoToComment (ImageGameCommentDto.Patch patchDto);
    default ImageGameCommentDto.Response commentToResponseDto (ImageGameComment imageGameComment) {
        ImageGameCommentDto.Response.ResponseBuilder response = ImageGameCommentDto.Response.builder();
        response.image(imageGameComment.getMember().getImage());
        response.nickName(imageGameComment.getMember().getNickname());
        response.mbti(imageGameComment.getMember().getTestResults().get(imageGameComment.getMember().getTestResults().size()-1).getMbti());
        response.content(imageGameComment.getContent());
        response.createdAt(imageGameComment.getCreatedAt());
        response.modifiedAt(imageGameComment.getModifiedAt());
        return response.build();
    }
    List<ImageGameCommentDto.Response> commentsToResponseDtos(List<ImageGameComment> comments);
}
