#!/usr/bin/env python3

import os
import subprocess
import frontmatter
import datetime
import pytz

# Get the current time in JST
def get_current_time_jst():
    jst = pytz.timezone('Asia/Tokyo')
    now = datetime.datetime.now(jst)
    return now.strftime("%Y-%m-%d %H:%M")

# Get list of modified and added files
def get_changed_files():
    # Get the list of files changed in the last commit
    result = subprocess.run(
        ["git", "diff", "--name-status", "HEAD~1", "HEAD"],
        capture_output=True, text=True, check=True
    )
    
    modified_files = []
    added_files = []
    
    for line in result.stdout.splitlines():
        parts = line.split('\t')
        if len(parts) < 2:
            continue
        
        status, file_path = parts[0], parts[1]
        
        # Only process markdown files in posts directory
        if not file_path.startswith('posts/') or not file_path.endswith('.md'):
            continue
        
        if status == 'A':  # Added
            added_files.append(file_path)
        elif status in ['M', 'R']:  # Modified or Renamed
            modified_files.append(file_path)
    
    return added_files, modified_files

def update_frontmatter_timestamps():
    added_files, modified_files = get_changed_files()
    current_time = get_current_time_jst()
    
    # Update published_at for new files
    for file_path in added_files:
        if os.path.exists(file_path):
            post = frontmatter.load(file_path)
            post['published_at'] = current_time
            
            # If updated isn't set, also set it to the current time
            if 'updated' not in post:
                post['updated'] = current_time
                
            with open(file_path, 'wb') as f:
                frontmatter.dump(post, f)
            print(f"Updated published_at in {file_path}")
    
    # Update updated for modified files
    for file_path in modified_files:
        if os.path.exists(file_path):
            post = frontmatter.load(file_path)
            post['updated'] = current_time
            
            with open(file_path, 'wb') as f:
                frontmatter.dump(post, f)
            print(f"Updated 'updated' timestamp in {file_path}")

if __name__ == "__main__":
    update_frontmatter_timestamps()
