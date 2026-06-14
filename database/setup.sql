-- Create Habitats table
CREATE TABLE IF NOT EXISTS habitats (
    habitat_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    theme TEXT NOT NULL
);

-- Create Experiences table (Linked to Habitats)
CREATE TABLE IF NOT EXISTS experiences (
    experience_id INTEGER PRIMARY KEY AUTOINCREMENT,
    habitat_id INTEGER,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    age_group TEXT NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY (habitat_id) REFERENCES habitats(habitat_id)
);

-- Create Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert Test Habitats (In English)
INSERT INTO habitats (name, description, image, theme) VALUES 
('Rainforest Canopy', 'Discover an immersive tropical world filled with vibrant exotic wildlife and lush treetops.', 'rainforest.png', 'Tropical'),
('Savannah Plains', 'Journey through wide-open grasslands to observe spectacular African mammals roaming freely.', 'savannah.png', 'Safari'),
('Reptile World', 'Step into a specialized environment dedicated to the conservation of fascinating amphibians and reptiles.', 'reptile.png', 'Exotic');

-- Insert Test Experiences (In English)
INSERT INTO experiences (habitat_id, name, description, age_group, image) VALUES 
(1, 'Lemur Walkthrough', 'Walk right alongside free-roaming lemurs in a specially designed natural habitat.', 'All Ages', 'lemur.png'),
(1, 'Nocturnal Canopy Tour', 'A guided evening expedition to observe the unique behaviors of our nocturnal rainforest animals.', '12+', 'night.png'),
(2, 'Giraffe Feeding Experience', 'Get up close and feed our gentle giants directly from an elevated viewing platform.', 'All Ages', 'giraffe.png'),
(3, 'Crocodile Conservation Talk', 'Learn critical facts about apex predators from our expert team of wildlife rangers.', '7+', 'croc.png');

-- Create Events table
CREATE TABLE IF NOT EXISTS events (
    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    year INTEGER NOT NULL,
    event_date DATE NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

-- Insert dummy events
INSERT INTO events (title, category, year, event_date, description, image) VALUES 
('Summer Wildlife Festival', 'Seasonal Celebrations', 2026, '2026-07-20', 'Join us for a massive summer celebration featuring local music, food stalls, and special animal encounters.', 'rainforest.png'),
('Nocturnal Safari', 'Night Experiences', 2026, '2026-08-15', 'Explore the park after dark with thermal cameras and expert guides.', 'night.png'),
('Spring Conservation Workshop', 'Educational Talks', 2026, '2026-05-10', 'Learn how to protect local habitats and create insect-friendly gardens at home.', 'lemur.png'),
('Winter Lights Trail', 'Seasonal Celebrations', 2025, '2025-12-15', 'A magical winter experience with eco-friendly light displays across the park.', 'giraffe.png'),
('Family Reptile Day', 'Family Activities', 2026, '2026-09-05', 'A hands-on educational day perfect for kids to learn about snakes and lizards.', 'croc.png');