import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
const React = require('react')
const Uppy = require('@uppy/core')
const Tus = require('@uppy/tus')
const GoogleDrive = require('@uppy/google-drive')
const Instagram = require('@uppy/instagram')
const { Dashboard, DashboardModal, DragDrop, ProgressBar } = require('@uppy/react')
// const Dashboard = require('@uppy/dashboard')
// const Dashboard = Uppy.Dashboard

// const uppy = Uppy({

//   })

// uppy.use(Dashboard, {
    // id: 'Dashboard',
    // target: 'body',
    // metaFields: [],
    // trigger: '#uppy-select-files',
    // inline: false,
    // width: 750,
    // height: 550,
    // thumbnailWidth: 280,
    // defaultTabIcon: defaultTabIcon,
    // showLinkToFileUploadResult: true,
    // showProgressDetails: false,
    // hideUploadButton: false,
    // hideRetryButton: false,
    // hidePauseResumeButton: false,
    // hideCancelButton: false,
    // hideProgressAfterFinish: false,
    // note: null,
    // closeModalOnClickOutside: false,
    // closeAfterFinish: false,
    // disableStatusBar: false,
    // disableInformer: false,
    // disableThumbnailGenerator: false,
    // disablePageScrollWhenModalOpen: true,
    // animateOpenClose: true,
    // proudlyDisplayPoweredByUppy: true,
    // onRequestCloseModal: () => this.closeModal(),
    // showSelectedFiles: true,
    // locale: defaultLocale,
    // browserBackButtonClose: false
//   })

class TryFour extends React.Component {
 
 
    constructor (props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }

    this.uppy = new Uppy({ id: 'uppy1', autoProceed: true, debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })
      .use(Instagram, { companionUrl: 'https://companion.uppy.io/', })

    this.uppy2 = new Uppy({ id: 'uppy2', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.uppy.close()
    this.uppy2.close()
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { showInlineDashboard } = this.state
    return (
      <div>
        <h1>React Examples</h1>

        <h2>Upload Photos</h2>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked
              })
            }}
          />
          Show/Hide Image Upload
        </label>
        {showInlineDashboard && (
          <Dashboard
            uppy={this.uppy}
            
            plugins={['GoogleDrive', 
            'Instagram']}
            metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' }
            ]}
          />
        )}

        {/* <h2>Modal Dashboard</h2>
        <div>
          <button onClick={this.handleModalClick}>
            {this.state.open ? 'Close dashboard' : 'Open dashboard'}
          </button>
          <DashboardModal
            uppy={this.uppy2}
            open={this.state.open}
            target={document.body}
            onRequestClose={() => this.setState({ open: false })}
          />
        </div> */}

        {/* <h2>Drag Drop Area</h2>
        <DragDrop
          uppy={this.uppy}
          locale={{
            strings: {
              chooseFile: 'Boop a file',
              orDragDrop: 'or yoink it here'
            }
          }}
        /> */}

        {/* <h2>Progress Bar</h2>
        <ProgressBar
          uppy={this.uppy}
          hideAfterFinish={false}
        /> */}
      </div>
    )
  }
}


export default (TryFour);