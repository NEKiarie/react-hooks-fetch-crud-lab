import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => {
        setQuestions(questions);
      });
  });

  function deleteQuestion(questionId) {
  const serverOption = {
      method: "DELETE",
    }

      fetch(`http://localhost:4000/questions/${questionId}`, serverOption)
      .then((resp) => resp.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => {
          return question.id !== questionId;
        });
        setQuestions(updatedQuestions);
      });
  }

  function updatedQuestion(question, newCorrectIndex) {
    const serverOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctIndex: newCorrectIndex}),
    };

    fetch(`http://localhost:4000/questions/${question.id}`, serverOption)
      .then((resp) => resp.json())
      .then((newQuestion) => {
        const updatedQuestions = questions.map((ques) => {
          if (ques.id === question.id) {
            return newQuestion;
          }
          return question;
        });
        setQuestions(updatedQuestions);
      });
  }

  //Rendering the questions
  const QuestionList = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        updatedQuestion={updatedQuestion}
        deleteQuestion={deleteQuestion}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{QuestionList}</ul>
    </section>
  );
}

export default QuestionList;
