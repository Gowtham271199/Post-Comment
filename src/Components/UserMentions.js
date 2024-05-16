import React, { useState } from 'react';

function MentionComments() {
  const [comment, setComment] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [postedComments, setPostedComments] = useState([]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setComment(value);
    const lastWord = value.split(' ').pop(); // Get the last word
    if (lastWord.startsWith('@')) {
      // Fetch suggestions based on the query
      const query = lastWord.substring(1);
      const fetchedSuggestions = fetchSuggestions(query);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const words = comment.split(' ');
    words.pop(); // Remove the '@username' from the text
    const newValue = words.join(' ') + ' ' + suggestion + ' ';
    setComment(newValue);
    setSuggestions([]);
  };

  const handlePostComment = () => {
    if (comment.trim()) {
      setPostedComments([...postedComments, comment.trim()]);
      setComment('');
    }
  };

  const fetchSuggestions = (query) => {
   
    return ['Samuel Jackson', 'Binoy David', 'Jackson', 'Selar'];
  };

  // Function to generate a random color code
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-lg p-4 bg-white rounded-md shadow-md">
        <textarea
          value={comment}
          onChange={handleInputChange}
          placeholder="Type your comment here..."
          className="w-full p-2 border rounded-md bg-white text-black"
        />
        <div className="border border-gray-300 mt-2 rounded-md">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center mr-2 text-white"
                style={{ backgroundColor: getRandomColor() }}
              >
                {suggestion.charAt(0)}
              </div>
              {suggestion}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-end">
          <button
            onClick={handlePostComment}
            className="px-7 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600"
          >
            Post
          </button>
        </div>
        <div className="mt-4">
          {postedComments.map((postedComment, index) => (
            <div key={index} className="border border-gray-300 p-2 mt-2 rounded-md">
              {postedComment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MentionComments;
