<?php

/**
 * @var Kirby\Cms\Page $page
 * @var Kirby\Cms\Site $site
 */

$robots_content = [];

if (param("page") !== null) {
  array_push($robots_content, "noindex");
} elseif ($page->robotsNoIndex()->isNotEmpty() && $page->robotsNoIndex()->value() !== 'default') {
  if ($page->robotsNoIndex()->value() === 'enabled') {
    array_push($robots_content, "noindex");
  }
} else {
  if ($site->robotsNoIndex()->value() === 'enabled') {
    array_push($robots_content, "noindex");
  }
}

if ($page->robotsNoFollow()->isNotEmpty() && $page->robotsNoFollow()->value() !== 'default') {
  if ($page->robotsNoFollow()->value() === 'enabled') {
    array_push($robots_content, "nofollow");
  }
} else {
  if ($site->robotsNoFollow()->value() === 'enabled') {
    array_push($robots_content, "nofollow");
  }
}

if ($page->robotsNoArchive()->isNotEmpty() && $page->robotsNoArchive()->value() !== 'default') {
  if ($page->robotsNoArchive()->value() === 'enabled') {
    array_push($robots_content, "noarchive");
  }
} else {
  if ($site->robotsNoArchive()->value() === 'enabled') {
    array_push($robots_content, "noarchive");
  }
}

if ($page->robotsNoImageIndex()->isNotEmpty() && $page->robotsNoImageIndex()->value() !== 'default') {
  if ($page->robotsNoImageIndex()->value() === 'enabled') {
    array_push($robots_content, "noimageindex");
  }
} else {
  if ($site->robotsNoImageIndex()->value() === 'enabled') {
    array_push($robots_content, "noimageindex");
  }
}

if ($page->robotsNoSnippet()->isNotEmpty() && $page->robotsNoSnippet()->value() !== 'default') {
  if ($page->robotsNoSnippet()->value() === 'enabled') {
    array_push($robots_content, "nosnippet");
  }
} else {
  if ($site->robotsNoSnippet()->value() === 'enabled') {
    array_push($robots_content, "nosnippet");
  }
}

$robots_content = implode(", ", $robots_content);
e($robots_content, '<meta name="robots" content="' . $robots_content . '" />');
