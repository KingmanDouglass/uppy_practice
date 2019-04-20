import axios from 'axios';
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import DragDrop from '@uppy/react/lib/DragDrop';

const OtherOne = ({ currentAvatar }) => {
  const uppy = Uppy({
    meta: { type: 'avatar' },
    restrictions: {
      maxNumberOfFiles: 1,
      maxFileSize: MAX_IMAGE_UPLOAD_FILESIZE_BYTES,
      allowedFileTypes: ['image/*'],
      minNumberOfFiles: 1,
    },
    autoProceed: true,
  })
  .use(AwsS3, {
    getUploadParameters (file) {
      console.log('file: ', file);
      return axios({
        url: `${API_ROOT_URL}/api/v1/sign/`,
        method: METHOD.GET,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
        params: {
          objectName: v4(),
        }
      }).then(response => {
        console.log('response: ', response);
      });
    }
  })
  .on('file-added', file => {
    console.log('Added file', file);
  })
  .on('upload-error', (file, error) => {
    console.log('error with file:', file.id);
    console.log('error message:', error);
  })
  .on('complete', result => {
    const url = result.successful[0].uploadURL;
    console.info('Upload complete!');
  })
  .run();
  return (
    <div>
      <img src={currentAvatar} alt="Current Avatar" />
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            chooseFile: 'Pick a new avatar'
          }
        }}
      />
    </div>
  );
};

export default OtherOne;