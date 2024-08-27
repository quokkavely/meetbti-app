package com.springboot.post.mapper;

import com.springboot.comment.mapper.CommentMapper;
import com.springboot.heart.entity.Heart;
import com.springboot.post.dto.PostDto;
import com.springboot.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = CommentMapper.class)
public interface PostMapper {
    Post postCreateDtoToPost(PostDto.Create create);
//    @Mapping(source = "memberId", target = "member.memberId")
    Post postUpdateDtoToPost(PostDto.Update update);
    PostDto.PatchResponse postToPostPatchResponseDto(Post post);
    default PostDto.GetResponse postToPostGetResponseDto(Post post, CommentMapper commentMapper, long requesterId) {
        boolean liked = false;
        for(Heart heart : post.getHearts()){
            if(heart.getMember().getMemberId() == requesterId){
                liked = true;
                break;
            }
        }
        PostDto.GetResponse.GetResponseBuilder response = PostDto.GetResponse.builder();
            response.postId(post.getPostId());
            response.title(post.getTitle());
            response.content(post.getContent());
            response.createdAt(post.getCreatedAt());
            response.modifiedAt(post.getModifiedAt());
            response.image(post.getMember().getImage());
            response.nickName(post.getMember().getNickname());
            response.mbti(post.getMember().getTestResults().get(post.getMember().getTestResults().size()-1).getMbti());
            response.heartCount(post.getHearts().size());
            response.viewCount(post.getViews().size());
            response.commentCount(post.getComments().size());
            response.comments(commentMapper.commentsToCommentDetailedResponseDtos(post.getComments()));
            response.liked(liked);
            response.postImage(post.getImage());

            return response.build();
    }
   default List<PostDto.GetResponse> postsToPostResponseDtos(List<Post> posts, CommentMapper commentMapper, long requesterId) {
       return posts.stream()
               .map(post -> postToPostGetResponseDto(post,commentMapper, requesterId))
               .collect(Collectors.toList());
   }
}
