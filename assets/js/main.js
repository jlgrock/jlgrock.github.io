
var redirects = {
	'?p=637': '/2017/12/08/config-dev-env-with-wsl.html',
	'?p=602': '/2015/10/25/scrum-a-quick-review-of-concepts.html',
	'?p=579': '/2015/06/21/adding-swap-space.html',
	'?p=553': '/2015/06/13/maven-settings.html',
	'?p=539': '/2015/06/10/microsoft-ad-and-cached-creds.html',
	'?p=516': '/2015/06/03/using-hk2-with-jersey.html',
	'?p=489': '/2014/10/06/the-new-hotness-spring-boot.html',
	'?p=474': '/2014/10/05/soap-v-rest.html',
	'?p=441': '/2014/09/29/natalias-russian-olivier.html',
	'?p=435': '/2014/04/10/secrets-of-google-email.html',
	'?p=423': '/2014/04/07/why-ill-never-use-crowdfunding-again.html',
	'?p=419': '/2014/03/11/use-spotify-play-button.html',
	'?p=405': '/2013/08/03/my-experiences-with-daily-deal-sites.html',
	'?p=350': '/2013/08/03/my-experiences-with-daily-deal-sites.html',
	'?p=339': '/2013/07/22/making-your-git-diffmerge-more-useful.html',
	'?p=348': '/2013/06/30/another-ms-product-bites-the-dust.html',
	'?p=317': '/2013/06/06/bash-and-zsh-shortcuts.html',
	'?p=272': '/2013/05/29/beer-brewing-extract-guide.html',
	'?p=242': '/2013/05/29/cable-companies-need-to-die.html',
	'?p=253': '/2013/05/24/stupid-google-error-message.html',
	'?p=244': '/2013/05/17/simple-groovy-isms.html',
	'?p=235': '/2013/02/24/thinking-of-buying-a-chrome-pixel.html',
	'?p=215': '/2013/02/15/my-new-favorite-toys.html',
	'?p=208': '/2013/02/13/learning-new-technologies.html',
	'?p=195': '/2013/01/05/accessing-java-resources.html',
	'?p=183': '/2013/01/03/phone-tablet-wars-heat-up.html',
	'?p=159': '/2012/12/04/git-tutorial.html',
	'?p=153': '/2012/12/02/impress-notes.html',
	'?p=166': '/2012/12/01/annoyed-with-linkedin.html',
	'?p=145': '/2012/11/18/sourcemaps-are-the-new-sliced-bread.html',
	'?p=129': '/2012/10/17/check-if-binding-variable-is-defined.html',
	'?p=125': '/2012/10/17/software-for-managing-your-code.html',
	'?p=120': '/2012/10/02/javascript-primer.html',
	'?p=114': '/2012/09/13/making-the-maven-version-and-subversion-version-match.html',
	'?p=97': '/2012/09/09/iphone-security-woes.html',
	'?p=89': '/2012/09/09/using-maven-to-package-javascript.html',
	'?p=82': '/2012/09/09/using-a-maven-javascript-dependency.html',
	'?p=12': '/2012/06/09/playing-harmonica.html',
	'?p=69': '/2012/05/15/testing-in-java.html',
	'?p=66': '/2012/05/04/java-7-is-here.html',
	'?p=33': '/2012/04/15/illustrator-cs4-design-polaroids.html',
	'?p=28': '/2012/04/09/jquery-and-impress.html',
	'?p=55': '/2012/04/09/wordpress-child-themes.html'
};

(function() {
  var s = document.location.search;
  if (s in redirects) {
    window.location.replace('/' + redirects[s]);
  }
})();
