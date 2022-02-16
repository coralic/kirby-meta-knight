<?php
$twitterImageThumb = [
  'width'   => 1200,
  'height'  => 675,
  'quality' => 80,
  'crop'    => true
];
$ogImageThumb = [
  'width'   => 1200,
  'height'  => 630,
  'quality' => 80,
  'crop'    => true
];

?>

<?php // Basic Meta Information 
?>

<?php // Schema 
?>

<style itemscope itemtype="https://schema.org/WebSite" itemref="schema_name schema_description schema_image"></style>

<?php // Page Title 
?>

<title><?= $page->metaTitleComputed() ?></title>
<meta id="schema_name" itemprop="name" content="<?= $page->metaTitleComputed() ?>">

<?php // Description 
?>

<meta name="description" content="<?= $page->metaDescription()->or($site->metaDescription()) ?>">
<meta id="schema_description" itemprop="description" content="<?= $page->metaDescription()->or($site->metaDescription()) ?>">

<?php // Canonical URL 
?>

<?php if ($page->metaCanonicalUrl()->isNotEmpty()) : ?>
  <link rel="canonical" href="<?= $page->metaCanonicalUrl() ?>" />
<?php else : ?>
  <link rel="canonical" href="<?= $page->canonicalUrl() ?>" />
<?php endif; ?>

<?php // Alternate languages 
?>

<?php if ($kirby->languages()->count() > 0) : ?>
  <?php foreach ($kirby->languages() as $language) : ?>
    <link rel="alternate" hreflang="<?= strtolower(html($language->code())) ?>" href="<?= $page->url($language->code()) ?>">
  <?php endforeach; ?>
  <link rel="alternate" hreflang="x-default" href="<?= $page->url($kirby->defaultLanguage()->code()) ?>">
<?php endif ?>

<?php // Image 
?>

<?php if ($metaImage = $page->metaImage()->toFile() ?? $site->metaImage()->toFile()) : ?>
  <meta id="schema_image" itemprop="image" content="<?= $metaImage->url() ?>">
<?php endif; ?>

<?php // Author 
?>

<meta name="author" content="<?= $page->metaAuthor()->or($site->metaAuthor()) ?>">

<?php // Date 
?>

<meta name="date" content="<?= $page->modified('Y-m-d') ?>">

<?php // Open Graph 
?>

<meta property="og:title" content="<?= $page->ogTitleComputed() ?>">

<meta property="og:description" content="<?= $page->ogDescription()->or($page->metaDescription())->or($site->ogDescription()->or($site->metaDescription())) ?>">

<?php if ($ogImage = $page->ogImage()->toFile() ?? $site->ogImage()->toFile()) : ?>
  <meta property="og:image" content="<?= $ogImage->thumb($ogImageThumb)->url() ?>">
  <meta property="og:image:width" content="<?= $ogImage->thumb($ogImageThumb)->width() ?>">
  <meta property="og:image:height" content="<?= $ogImage->thumb($ogImageThumb)->height() ?>">
<?php endif; ?>

<meta property="og:site_name" content="<?= $page->ogSiteName()->or($site->ogSiteName())->or($site->title()) ?>">

<meta property="og:url" content="<?= $page->ogUrl()->or($page->metaCanonicalUrl()->or($page->canonicalUrl())) ?>">

<meta property="og:type" content="<?= $page->ogType()->or("website") ?>">

<?php if ($page->ogAudio()->isNotEmpty()) : ?>
  <meta property="og:audio" content="<?= $page->ogAudio() ?>">
<?php endif; ?>

<?php if ($page->ogVideo()->isNotEmpty()) : ?>
  <meta property="og:video" content="<?= $page->ogVideo() ?>">
<?php endif; ?>

<?php if ($kirby->language() !== null) : ?>
  <meta property="og:locale" content="<?= $kirby->language()->locale(LC_ALL) ?>">
  <?php foreach ($kirby->languages() as $language) : ?>
    <?php if ($language !== $kirby->language()) : ?>
      <meta property="og:locale:alternate" content="<?= $language->locale(LC_ALL) ?>">
    <?php endif; ?>
  <?php endforeach; ?>
<?php endif; ?>

<?php // Twitter Card 
?>

<meta name="twitter:card" content="<?= $page->twitterCardType()->or($site->twitterCardType())->value() ?>">

<meta name="twitter:title" content="<?= $page->twitterTitleComputed() ?>">

<meta name="twitter:description" content="<?= $page->twitterDescription()->or($page->metaDescription())->or($site->twitterDescription()->or($site->metaDescription())) ?>">

<?php if ($twitterImage = $page->twitterImage()->toFile() ?? $site->twitterImage()->toFile()) : ?>
  <meta name="twitter:image" content="<?= $twitterImage->thumb($twitterImageThumb)->url() ?>">
<?php endif; ?>

<meta name="twitter:site" content="<?= $page->twitterSite()->or($site->twitterSite()) ?>">

<meta name="twitter:creator" content="<?= $page->twitterCreator()->or($site->twitterCreator()) ?>">