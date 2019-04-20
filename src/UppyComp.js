import React from 'react';
const Uppy = require('@uppy/core')
const Tus = require('@uppy/tus')
const { DragDrop } = require('@uppy/react')

const uppy = Uppy({
  meta: { type: 'avatar' },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true
})

uppy.use(Tus, { endpoint: '/upload' })

uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL
  store.dispatch({
    type: SET_USER_AVATAR_URL,
    payload: { url: url }
  })
})

const UppyComp = ({ currentAvatar }) => {
  return (
    <div>
      <img src={currentAvatar} alt="Current Avatar" />
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            // Text to show on the droppable area.
            // `%{browse}` is replaced with a link that opens the system file selection dialog.
            dropHereOr: 'Drop here or %{browse}',
            // Used as the label for tneed tohe link that opens the system file selection dialog.
            browse: 'browse'
          }
        }}
      />
    </div>
  )
}

export default UppyComp;