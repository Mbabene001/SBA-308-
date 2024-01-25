// The provided course information = x

let x = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group = y 

let y = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data = z

let z = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];









function getLearnerData(x, y, z) {
  
  // Check if AssignmentGroup belongs to its course

  if (y.course_id == x.id) {
  } else {
    throw new Error("Invalid input: AssignmentGroup does not belong to its course.");
  }

  // Result array 

  let result = [];

  // Iterate through learner submissions

  for (let i = 0; i < z.length; i++) {
    const submission = z[i];
    const assignment = findAssignmentById(y.assignments, submission.assignment_id);

    // Check if assignment exists

    if (!assignment) {
      console.error(`Assignment with id ${submission.assignment_id} not found.`);
      continue;
    }

    // Check if submission is not late

    if (isSubmissionOnTime(submission, assignment)) {
      
      // Calculate late penalty if submission is late

      let latePenalty = calculateLatePenalty(submission, assignment);

      // Initialize learner object in result array if not present

      let learnerExists = false;
      for (let j = 0; j < result.length; j++) {
        if (result[j].id === submission.learner_id) {
          learnerExists = true;
          break;
        }
      }

      if (!learnerExists) {
        result.push({
          id: submission.learner_id,
          avg: 0,
        });
      }

      // Update learner's average and individual assignment scores

      for (let k = 0; k < result.length; k++) {
        if (result[k].id === submission.learner_id) {
          let learner = result[k];
          let normalizedScore = Math.max(0, submission.submission.score - latePenalty) / assignment.points_possible;
          learner.avg = (learner.avg * (assignment.id - 1) + normalizedScore) / assignment.id;
          learner[assignment.id] = normalizedScore;
          break;
        }
      }
    }
  }

  return result;
}

// Helper function to find assignment by id

function findAssignmentById(assignments, assignmentId) {
  for (let i = 0; i < assignments.length; i++) {
    if (assignments[i].id === assignmentId) {
      return assignments[i];
    }
  }
  return null;
}

// Helper function to check if submission is on time

function isSubmissionOnTime(submission, assignment) {
  const dueDate = new Date(assignment.due_at);
  const submittedDate = new Date(submission.submission.submitted_at);
  return submittedDate <= dueDate;
}

// If submission is late, deduct 10% of total points possible

function calculateLatePenalty(submission, assignment) {
  if (!isSubmissionOnTime(submission, assignment)) {
    return assignment.points_possible * 0.1;
  }

  // No penalty if submission on time.

  return 0; 
}

try {
  let formattedData = getLearnerData(x, y, z);
  console.log("Formatted Data:", formattedData);
} catch (error) {
  console.error("Error:", error.message);
}





  
  

  