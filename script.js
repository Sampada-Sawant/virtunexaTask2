// Sample data - in a real app, this would come from a database
const sampleGroups = [
    {
      id: 1,
      name: "Advanced Calculus",
      subject: "math",
      description: "For students taking advanced calculus courses. We meet weekly to solve problems together.",
      members: 12,
      activeMembers: 8,
      created: "2023-05-15"
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      subject: "programming",
      description: "Learning data structures and algorithms together. All skill levels welcome!",
      members: 24,
      activeMembers: 15,
      created: "2023-04-20"
    },
    {
      id: 3,
      name: "World History Study",
      subject: "history",
      description: "Exploring world history from ancient civilizations to modern times.",
      members: 8,
      activeMembers: 5,
      created: "2023-06-01"
    },
    {
      id: 4,
      name: "Biology Study Group",
      subject: "science",
      description: "Focusing on cellular biology and genetics. Lab partners welcome!",
      members: 16,
      activeMembers: 10,
      created: "2023-05-28"
    }
  ];
  
  // DOM Elements
  const groupsList = document.getElementById('groups-list');
  const groupForm = document.getElementById('group-form');
  const searchInput = document.querySelector('.search-input');
  const subjectFilter = document.querySelector('.subject-filter');
  const loadMoreBtn = document.getElementById('load-more');
  const sharedNote = document.getElementById('shared-note');
  const notePreview = document.getElementById('note-preview');
  
  // Display all groups on page load
  document.addEventListener('DOMContentLoaded', function() {
    displayGroups(sampleGroups);
    
    // Set up real-time note preview
    sharedNote.addEventListener('input', function() {
      notePreview.textContent = this.value;
    });
  });
  
  // Display groups function
  function displayGroups(groups) {
    // Clear existing groups
    groupsList.innerHTML = '';
    
    // Add each group to the page
    groups.forEach(group => {
      const groupCard = document.createElement('div');
      groupCard.className = 'group-card';
      groupCard.innerHTML = `
        <div class="group-header">
          <h3>${group.name}</h3>
          <p class="group-subject">${getSubjectName(group.subject)}</p>
        </div>
        <div class="group-body">
          <p class="group-desc">${group.description}</p>
          <div class="group-meta">
            <span><i class="fas fa-users"></i> ${group.members} members</span>
            <span><i class="fas fa-clock"></i> ${formatDate(group.created)}</span>
          </div>
          <div class="group-actions">
            <button class="btn-small btn-secondary"><i class="fas fa-info-circle"></i> Details</button>
            <button class="btn-small btn-primary join-group" data-id="${group.id}"><i class="fas fa-user-plus"></i> Join</button>
          </div>
        </div>
      `;
      groupsList.appendChild(groupCard);
    });
    
    // Add event listeners to join buttons
    document.querySelectorAll('.join-group').forEach(button => {
      button.addEventListener('click', function() {
        const groupId = parseInt(this.getAttribute('data-id'));
        joinGroup(groupId);
      });
    });
  }
  
  // Join group function
  function joinGroup(groupId) {
    const group = sampleGroups.find(g => g.id === groupId);
    if (group) {
      group.members += 1;
      
      // Update the button
      const joinBtn = document.querySelector(`.join-group[data-id="${groupId}"]`);
      joinBtn.innerHTML = '<i class="fas fa-check"></i> Joined';
      joinBtn.classList.remove('btn-primary');
      joinBtn.classList.add('btn-secondary');
      joinBtn.disabled = true;
      
      // Show success message
      alert(`You've joined the ${group.name} group!`);
    }
  }
  
  // Create new group form handling
  groupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('group-name').value.trim();
    const subject = document.getElementById('group-subject').value;
    const description = document.getElementById('group-desc').value.trim();
    
    // Validate inputs
    let isValid = true;
    
    // Name validation
    if (name.length < 5) {
      document.getElementById('name-error').textContent = 'Group name must be at least 5 characters';
      document.getElementById('name-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }
    
    // Subject validation
    if (!subject) {
      document.getElementById('subject-error').textContent = 'Please select a subject';
      document.getElementById('subject-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('subject-error').style.display = 'none';
    }
    
    // Description validation
    if (description.length < 20) {
      document.getElementById('desc-error').textContent = 'Description must be at least 20 characters';
      document.getElementById('desc-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('desc-error').style.display = 'none';
    }
    
    // If all valid, create new group
    if (isValid) {
      const newGroup = {
        id: sampleGroups.length + 1,
        name,
        subject,
        description,
        members: 1,
        activeMembers: 1,
        created: new Date().toISOString().split('T')[0]
      };
      
      sampleGroups.unshift(newGroup); // Add to beginning of array
      displayGroups(sampleGroups); // Refresh display
      
      // Reset form
      this.reset();
      
      // Show success message
      alert(`Your "${name}" study group has been created successfully!`);
      
      // Scroll to the top to see the new group
      window.scrollTo({
        top: document.querySelector('.study-groups').offsetTop - 20,
        behavior: 'smooth'
      });
    }
  });
  
  // Search and filter functionality
  searchInput.addEventListener('input', filterGroups);
  subjectFilter.addEventListener('change', filterGroups);
  
  function filterGroups() {
    const searchTerm = searchInput.value.toLowerCase();
    const subjectFilterValue = subjectFilter.value;
    
    const filteredGroups = sampleGroups.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm) || 
                           group.description.toLowerCase().includes(searchTerm);
      const matchesSubject = !subjectFilterValue || group.subject === subjectFilterValue;
      
      return matchesSearch && matchesSubject;
    });
    
    displayGroups(filteredGroups);
  }
  
  // Load more groups (simulated)
  loadMoreBtn.addEventListener('click', function() {
    // In a real app, this would fetch more data from a server
    alert("In a complete app, this would load more groups from the server!");
  });
  
  // Helper functions
  function getSubjectName(subjectKey) {
    const subjects = {
      math: "Mathematics",
      science: "Science",
      history: "History",
      programming: "Programming"
    };
    return subjects[subjectKey] || subjectKey;
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }