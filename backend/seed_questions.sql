-- Seed Questions for Project Samriddhi
-- Subjects: science, math, history, computer, geography

INSERT INTO questions (subject_id, question, options, correct_answer, explanation, level)
VALUES 
-- Science Questions
('science', 'What is the human body''s largest organ?', '["Heart", "Brain", "Skin", "Liver"]', 2, 'The skin is the largest organ by both surface area and weight.', 'easy'),
('science', 'Which planet has the most moons?', '["Jupiter", "Saturn", "Neptune", "Mars"]', 1, 'Saturn overtook Jupiter in 2019 with a total of 82 moons discovered.', 'medium'),
('science', 'What is the speed of light?', '["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "50,000 km/s"]', 0, 'Light travels at approximately 299,792,458 meters per second.', 'hard'),
('science', 'What is the pH level of pure water?', '["5", "7", "9", "11"]', 1, 'Pure water is neutral with a pH of 7.', 'easy'),
('science', 'Which gas is responsible for the green color of plants?', '["Carbon Dioxide", "Chlorophyll", "Oxygen", "Nitrogen"]', 1, 'Chlorophyll is the pigment that gives plants their green color and is used in photosynthesis.', 'medium'),
('science', 'What is the power source for the sun?', '["Nuclear Fission", "Chemical Burning", "Nuclear Fusion", "Electric Arche"]', 2, 'Nuclear fusion of hydrogen into helium powers the sun.', 'hard'),

-- Math Questions
('math', 'What is the value of Pi (to 2 decimal places)?', '["3.12", "3.14", "3.16", "3.18"]', 1, 'Pi is approximately 3.14159...', 'easy'),
('math', 'What is the square root of 225?', '["12", "13", "14", "15"]', 3, '15 * 15 = 225.', 'medium'),
('math', 'If 2x + 5 = 15, what is x?', '["5", "10", "15", "x"]', 0, 'Subtract 5: 2x = 10; Divide by 2: x = 5.', 'easy'),
('math', 'What is the sum of angles in a triangle?', '["90 degrees", "180 degrees", "270 degrees", "360 degrees"]', 1, 'The sum of interior angles in any triangle is always 180 degrees.', 'easy'),
('math', 'What is 15% of 200?', '["20", "25", "30", "35"]', 2, '0.15 * 200 = 30.', 'medium'),
('math', 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?', '["11", "12", "13", "14"]', 2, 'This is the Fibonacci sequence; 5 + 8 = 13.', 'medium'),

-- History Questions
('history', 'Who was the first woman to win a Nobel Prize?', '["Mother Teresa", "Marie Curie", "Jane Addams", "Malala Yousafzai"]', 1, 'Marie Curie won in 1903 for Physics.', 'medium'),
('history', 'Which empire built the Colosseum in Rome?', '["Greek Empire", "Byzantine Empire", "Roman Empire", "Ottoman Empire"]', 2, 'The Roman Empire built it under the Flavian dynasty.', 'easy'),
('history', 'In which year did World War II end?', '["1943", "1944", "1945", "1946"]', 2, 'WWII ended in 1945.', 'easy'),
('history', 'Who was the primary author of the U.S. Declaration of Independence?', '["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"]', 2, 'Thomas Jefferson drafted the primary version.', 'medium'),
('history', 'The French Revolution began in which year?', '["1776", "1789", "1804", "1812"]', 1, 'The revolution began with the storming of the Bastille in 1789.', 'hard'),

-- Computer Questions
('computer', 'What does CPU stand for?', '["Central Processing Unit", "Computer Power Unit", "Core Program Unit", "Control Process Utility"]', 0, 'CPU is the brain of the computer.', 'easy'),
('computer', 'Which programming language is known for "write once, run anywhere"?', '["Python", "C++", "Java", "Ruby"]', 2, 'Java''s slogan highlights its platform independence.', 'medium'),
('computer', 'What is the binary representation of the decimal number 10?', '["1010", "1100", "1001", "1111"]', 0, '8 + 2 = 10, so 1010.', 'medium'),
('computer', 'Who is considered the first computer programmer?', '["Alan Turing", "Ada Lovelace", "Charles Babbage", "Bill Gates"]', 1, 'Ada Lovelace wrote the first algorithm for Babbage''s engine.', 'hard'),
('computer', 'What does HTTP stand for?', '["HyperText Transfer Protocol", "HighText Transfer Process", "HyperTotal Transfer Protocol", "HyperText Token Protocol"]', 0, 'HTTP is the foundation of data communication for the web.', 'medium'),

-- Geography Questions
('geography', 'What is the smallest country in the world?', '["Monaco", "Nauru", "Vatican City", "San Marino"]', 2, 'Vatican City is the smallest independent state by area and population.', 'easy'),
('geography', 'Which river is the longest in the world?', '["Amazon", "Nile", "Mississippi", "Yangtze"]', 1, 'The Nile is traditionally considered the longest, though some debate Amazon.', 'easy'),
('geography', 'Which desert is the largest in the world?', '["Sahara", "Gobi", "Antarctic", "Kalahari"]', 2, 'The Antarctic Desert is the largest overall (cold desert).', 'hard'),
('geography', 'Which country has the most natural lakes?', '["USA", "Russia", "Canada", "Norway"]', 2, 'Canada has more lakes than the rest of the world combined.', 'medium'),
('geography', 'Mount Everest is located on the border of which two countries?', '["India and China", "Nepal and China", "India and Nepal", "Bhutan and China"]', 1, 'It sits on the border of Nepal and the Tibet Autonomous Region of China.', 'medium');
