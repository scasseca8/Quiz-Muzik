
function getUserScores() {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    return scores.sort((a, b) => b.score - a.score); 
  }
  
  function renderScores() {
    const scores = getUserScores();
    const table = document.querySelector("main");
    let tableHTML = `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Pontuação</th>
            <th>Tentativas</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    scores.forEach((user, index) => {
     
      const attempts = user.attempts !== undefined ? user.attempts : 0;
  
      tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${user.name}</td>
          <td>${user.score}</td>
          <td>${attempts}</td> 
        </tr>
      `;
    });
  
    tableHTML += `
        </tbody>
      </table>
    `;
  
    table.innerHTML = tableHTML;
  }
  
  document.addEventListener("DOMContentLoaded", renderScores);