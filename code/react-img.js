class Img extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      src: this.props.placeholder || this.props.src || this.props.notFound
    }
    this.onLoad = this.onLoad.bind(this)
    this.onError = this.onError.bind(this)
  }

  onLoad (e) {
    const { src, placeholder, notFound, onLoad, onError } = this.props

    switch (this.state.src) {
      case placeholder:
        this.setState({ src: src })
        break
      case src:
        onLoad && onLoad()
        break
      case notFound:
        onError && onError(e)
        break
    }
  }

  onError (e) {
    const { src, placeholder, notFound, onError, onErrorAll } = this.props

    switch (this.state.src) {
      case placeholder:
        this.setState({ src: src })
        break
      case src:
        notFound
          ? this.setState({ src: notFound })
          : onError && onError(e)
        break
      case notFound:
        onErrorAll && onErrorAll(e)
        break
    }
  }

  render () {
    const { alt, title, className, onClick } = this.props
    const { src } = this.state

    return (
      <img
        src={src}
        alt={alt}
        title={title}
        className={className}
        onClick={onClick}
        onLoad={this.onLoad}
        onError={this.onError}
      />
    )
  }
}
