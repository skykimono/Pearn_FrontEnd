import React from 'react';
import { useParams } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useFetchSubmission } from '../redux/block/hook';

const Submission = () => {
    let {submissionId} = useParams();
    const data = useFetchSubmission(submissionId);
  return (
    <div className="submission">
        <h1>Submission</h1>
    <MarkdownPreview className="submission-md" source={data.submission} />
</div>
  )
}

export default Submission