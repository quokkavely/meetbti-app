INSERT INTO Question (question_id, content, tendency) VALUES (1, '여유 시간이 생겼을 때, 당신은 무엇을 하길 선호하나요?', 'E');
INSERT INTO Question (question_id, content, tendency) VALUES (2, '예상치 못한 상황에서 당신의 즉흥적인 선택은?', 'E');
INSERT INTO Question (question_id, content, tendency) VALUES (3, '당신의 이상적인 휴가 스타일은?', 'E');
INSERT INTO Question (question_id, content, tendency) VALUES (4, '사람들과의 대화에서 당신은 주로 어떤 주제로 이야기하나요?', 'E');

INSERT INTO Question (question_id, content, tendency) VALUES (5, '새로운 도전을 앞둔 당신의 첫 번째 생각은?', 'S');
INSERT INTO Question (question_id, content, tendency) VALUES (6, '당신은 물건을 선택할 때 어떤 기준으로 선택하나요?', 'S');
INSERT INTO Question (question_id, content, tendency) VALUES (7, '예상치 못한 문제가 발생했을 때, 당신은 어떻게 반응하나요?', 'S');
INSERT INTO Question (question_id, content, tendency) VALUES (8, '대화를 나눌 때, 당신은 어떤 종류의 이야기에 더 끌리나요?', 'S');

INSERT INTO Question (question_id, content, tendency) VALUES (9, '친구가 고민을 상담해왔을 때, 당신의 첫 반응은?', 'T');
INSERT INTO Question (question_id, content, tendency) VALUES (10, '팀 프로젝트에서 의견이 충돌했을 때, 당신의 태도는?', 'T');
INSERT INTO Question (question_id, content, tendency) VALUES (11, '중요한 결정을 앞두고, 당신이 가장 중시하는 것은?', 'T');
INSERT INTO Question (question_id, content, tendency) VALUES (12, '당신이 영화나 책을 선택할 때, 무엇이 더 끌리나요?', 'T');

INSERT INTO Question (question_id, content, tendency) VALUES (13, '여행을 떠나기 전, 당신은 어떻게 준비하나요?', 'J');
INSERT INTO Question (question_id, content, tendency) VALUES (14, '당신의 데일리 루틴은 어떤가요?', 'J');
INSERT INTO Question (question_id, content, tendency) VALUES (15, '당신이 업무를 처리할 때 주로 어떤 방식을 사용하나요?', 'J');
INSERT INTO Question (question_id, content, tendency) VALUES (16, '친구들과의 약속을 잡을 때, 당신의 행동은?', 'J');

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (1, 1, '새로운 취미를 찾아본다.', 67);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (2, 1, '잠깐 산책을 하며 머리를 식힌다.', 52);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (3, 1, '가만히 앉아 생각을 정리한다.', 29);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (4, 1, '음악을 들으며 편안하게 쉰다.', 43);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (5, 2, '근처 카페에서 커피를 한 잔 마신다.', 46);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (6, 2, '집에 돌아가 휴식을 취한다.', 22);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (7, 2, '주변 사람들과 함께 해결책을 모색한다.', 71);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (8, 2, '혼자만의 시간을 갖는다.', 35);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (9, 3, '다양한 활동을 즐기며 보낸다.', 74);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (10, 3, '익숙한 장소에서 편안하게 보낸다.', 38);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (11, 3, '목적 없이 이곳저곳 돌아다닌다.', 55);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (12, 3, '조용한 곳에서 힐링한다.', 27);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (13, 4, '최신 유행이나 소식에 대해 이야기한다.', 66);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (14, 4, '과거의 경험을 회상하며 이야기한다.', 33);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (15, 4, '철학적인 주제를 탐구한다.', 19);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (16, 4, '가벼운 일상 이야기를 나눈다.', 44);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (17, 5, '지금 필요한 준비물을 확인한다.', 77);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (18, 5, '이 도전이 내게 어떤 의미가 있는지 생각한다.', 42);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (19, 5, '이 도전이 어떻게 끝날지 상상한다.', 29);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (20, 5, '준비 과정에서 생길 수 있는 변수를 고려한다.', 54);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (21, 6, '실제로 사용해본 후 구매를 결정한다.', 69);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (22, 6, '다른 사람의 의견을 참고해 결정한다.', 47);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (23, 6, '물건의 독창성과 디자인을 본다.', 33);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (24, 6, '제품의 기능을 꼼꼼히 분석한다.', 58);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (25, 7, '일단 상황을 파악하고 즉시 행동에 옮긴다.', 81);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (26, 7, '문제의 원인을 생각해보고 계획을 세운다.', 61);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (27, 7, '문제를 해결하는 다양한 방법을 상상해본다.', 36);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (28, 7, '이전에 유사한 경험이 있는지 떠올린다.', 55);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (29, 8, '구체적인 사실과 정보가 있는 이야기.', 72);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (30, 8, '추상적이고 개념적인 이야기.', 34);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (31, 8, '다른 사람의 경험담.', 49);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (32, 8, '미래에 대한 상상력 넘치는 이야기.', 27);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (33, 9, '문제를 해결할 수 있는 방법을 제시한다.', 73);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (34, 9, '친구의 말을 먼저 들어준다.', 41);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (35, 9, '친구의 감정을 이해하려고 노력한다.', 36);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (36, 9, '논리적으로 상황을 분석해준다.', 62);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (37, 10, '각자의 입장을 분석해 합리적인 결론을 찾는다.', 78);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (38, 10, '모든 의견을 조율해 중재하려고 한다.', 53);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (39, 10, '논리적으로 옳은 방향을 제시한다.', 66);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (40, 10, '상황을 부드럽게 마무리하려고 한다.', 39);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (41, 11, '가장 합리적이고 논리적인 선택.', 82);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (42, 11, '내 직감과 느낌을 따르는 선택.', 47);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (43, 11, '주변 사람들의 의견과 감정을 고려한 선택.', 34);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (44, 11, '상황에 맞는 유연한 선택.', 60);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (45, 12, '사건이 논리적으로 전개되는 이야기.', 74);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (46, 12, '감정적으로 울림이 있는 이야기.', 40);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (47, 12, '결말이 예측 불가능한 이야기.', 59);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (48, 12, '인물들의 감정 변화에 초점을 맞춘 이야기.', 31);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (49, 13, '미리 모든 것을 철저히 준비한다.', 79);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (50, 13, '대략적인 계획만 세운다.', 52);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (51, 13, '필요한 최소한의 준비만 한다.', 35);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (52, 13, '계획 없이 즉흥적으로 준비한다.', 21);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (53, 14, '일정하게 계획된 루틴을 따른다.', 80);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (54, 14, '그때그때 상황에 따라 루틴이 달라진다.', 42);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (55, 14, '최소한의 루틴만 유지한다.', 59);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (56, 14, '루틴을 따르지 않고 자유롭게 행동한다.', 30);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (57, 15, '체계적으로 계획을 세우고 이를 따른다.', 77);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (58, 15, '상황에 따라 융통성 있게 처리한다.', 49);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (59, 15, '필요한 것만 빠르게 처리한다.', 36);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (60, 15, '즉흥적으로 일을 진행한다.', 28);

INSERT INTO Answer (answer_id, question_id, content, score) VALUES (61, 16, '미리 날짜와 시간을 조율해놓는다.', 83);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (62, 16, '대략적인 계획만 잡아놓고 상황에 맞춘다.', 45);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (63, 16, '필요할 때마다 계획을 수정한다.', 58);
INSERT INTO Answer (answer_id, question_id, content, score) VALUES (64, 16, '즉석에서 결정하는 편이다.', 32);

INSERT INTO balance_game (title, left_option, right_option, nickname, game_status) VALUES
('평생 날 수 있는 능력을 갖기 vs 투명인간이 되기', '날기', '투명인간', '관리자', 'ACTIVE'),
('시간을 더 갖기 vs 돈을 더 갖기', '시간 더 갖기', '돈 더 갖기', '관리자', 'ACTIVE'),
('SNS를 평생 사용하지 않기 vs 영화를 평생 보지 않기', 'SNS 안 하기', '영화 안 보기', '관리자', 'ACTIVE'),
('너무 더운 상태로 살기 vs 너무 추운 상태로 살기', '너무 더운', '너무 추운', '관리자', 'ACTIVE'),
('인생에서 되감기 버튼 갖기 vs 일시정지 버튼 갖기', '되감기 버튼', '일시정지 버튼', '관리자', 'ACTIVE');

INSERT INTO image_game (topic, nick_name, game_status) VALUES
('가장 리더십이 강할 것 같은 MBTI는?', '관리자', 'ACTIVE'),
('가장 창의적일 것 같은 MBTI는?', '관리자', 'ACTIVE'),
('가장 사교적일 것 같은 MBTI는?', '관리자', 'ACTIVE'),
('가장 분석적일 것 같은 MBTI는?', '관리자', 'ACTIVE'),
('가장 감정적일 것 같은 MBTI는?', '관리자', 'ACTIVE');

