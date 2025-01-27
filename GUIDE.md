1.reading test
vi du : 
POST
http://localhost:5000/v1/exam/create

{
  "examName" : "exam2",
  "type" : "reading"
}

POST

http://localhost:5000/v1/question/create_multiple

{ "examId" : "6793458283c4e1ba01100922",
    "questions": [
        {
            "question_text": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin", "Madrid"],
            "correct_answer": "Paris",
            "question_img" : "abcd"
        },
        {
            "question_text": "What is 2 + 2?",
            "options": ["3", "4", "5", "6"],
            "correct_answer": "4",
            "question_img" : "abcde"
        }
    ]
}


2.listening test

vi du : 
POST
http://localhost:5000/v1/exam/create

{
  "examName" : "exam3",
  "type" : "listening"
}

POST

http://localhost:5000/v1/question/create_multiple

{ "examId" : "67945f91c0cd26be709ab728",
    "questions": [
        {
            "question_text": "What is the capital of Viet Nam?",
            "options": ["Ha Noi", "London", "Berlin", "Madrid"],
            "correct_answer": "Ha Noi",
            "question_img" : "abcd"
        },
        {
            "question_text": "What is 2 + 3?",
            "options": ["3", "4", "5", "6"],
            "correct_answer": "5",
            "question_img" : "abcde"
        }
    ]
}

_id 67945f91c0cd26be709ab728
examName "exam3"
questions Array (2)
0 6797b70af1982bd35a68c327
1 6797b70af1982bd35a68c328
type
"listening"

POST 
http://localhost:5000/upload/file

file 41-2-17_1659322942143.mp3

PUT
//
params 

fileID 6797bc7c1568e2e4a48caafd

body 
{
  "filename" : 6797b70af1982bd35a68c327.mp3
}


GET

http://localhost:5000/download/files/:fileId

6797bc7c1568e2e4a48caafd

-> preview 