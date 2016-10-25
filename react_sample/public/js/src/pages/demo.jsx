import CommentBox from '../components/CommentBox.jsx'

var url_comments = '/api/comments';
ReactDOM.render(<CommentBox url={url_comments} pollInterval={2000}/>, document.getElementsByClassName('commentBox')[0]);