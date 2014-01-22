***********
* README: *
***********

DESCRIPTION:
------------
This module adds interactivity to text, by adding response behaviours to mouse 
actions on those text. 

select the particular text on node content and add multiple comments based upon
 the selected text by using mouse action on click and hover. 

Examples of inline comments are: adding inline comments but this module have 
more advantange than comment. it give spontaneous response about inline comment
 and use multiple comments for single selected text and see it on mouse hover.

DEPENDENCIES:
-------------
- Views Module (https://drupal.org/project/views)

- Comment Module 

- Jquery Cluetip plugin (https://github.com/kswedberg/jquery-cluetip)

INSTALLATION:
-------------
1. Download Jquery Cluetip plugin and extract the contents into the following 
location: 'sites/all/libraries/'.

2. Download Views module and its dependencies modules and place it into the 
following location: 'sites/all/modules/' directory.

3. Enable Views module by navigating to: 
		Administer > Modules.

4. Download and place the entire inline_comments directory into 
sites/all/modules/ directory.

5. Enable Inline Comment module by navigating to: 
		Administer > Modules.
		
6. Configure permissions by assigning user roles that can 'post comments'.

USAGE:
------
1. Navigate to:
		Administer > Add Content > Basic Page/Article

2. Add the content to be used as the inline comment

3. Optionally set comment to be opened to allow the inline comment by mouse 
action.

4. Save and view the node page.

5. Create inline comment by clicking or selecting on the required node content,
 and filling up the pop-up form. 

6. Check mouse-over behaviour on the inline comment. 

7. Create multiple new inline comment for same selected content if needed. 
View all in mouse-over behaviour on that inline comment.

Author:
-------
Ravi Sambamurthy (ravi.sambamurthy@gmail.com)
http://drupal.org/user/234725
