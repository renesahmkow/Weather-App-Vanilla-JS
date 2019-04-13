window.addEventListener('load', () => {
  let long
  let lat
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  )
  let temperatureDegree = document.querySelector('.degree__section-temperature')
  let locationTimezone = document.querySelector('.location__timezone')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/241a16eefc47200514db9887c3f9561d/${lat},${long}`
      fetch(api)
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log(data)
          const { temperature, summary, icon } = data.currently
          temperatureDegree.textContent = temperature
          temperatureDescription.textContent = summary
          locationTimezone.textContent = data.timezone

          setIcons(icon)
        })
    })
  }

  function setIcons(icon, iconID) {
    const skycons = new skycons({ color: 'white' })
    const currentIcon = icon.repace(/-/g, '_').toUpperCase()
    skycons.play()
    return skycons.det(iconID, Skycons[currentIcon])
  }
})
