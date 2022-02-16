<?php

use Kirby\Toolkit\Config;
use Kirby\Toolkit\I18n;

return [
  'props' => [
    'headline' => function ($headline = 'Facebook Sharing Preview') {
      return I18n::translate($headline, $headline);
    }
  ],
  'computed' => [
    'headline' => function () {
      if ($this->headline) {
        return $this->model()->toString($this->headline);
      }

      return ucfirst($this->name);
    },
    'title' => function () {
      $kirby = kirby();
      $model = $this->model();

      if ($kirby->request()->query()->isNotEmpty()) {
        $model = $model->clone(['content' => array_merge(['title' => $model->title()->value()], $model->content()->data(), $kirby->request()->query()->data())]);
      }

      if ($model->site()->id() == $model->id()) {
        return $model->homePage()->toSafeString(
          $model->ogTemplate()->or(Config::get('coralic.meta-knight.defaultOpenGraph'))->value(),
          ['title' => $model->homePage()->ogTitle()->or($model->homePage()->metaTitle()->or($model->homePage()->title()))]
        );
      }

      return $model->ogTitleComputed();
    },
    'fallbackDescription' => function () {
      $model = $this->model();

      if ($model->site()->id() == $model->id())
        return $model->homePage()->ogDescription()->or($model->homePage()->metaDescription())->value();

      return $model->site()->ogDescription()->or($model->site()->metaDescription())->value();
    },
    'fallbackImage' => function () {
      $file = $this->model()->site()->twitterImage()->toFile();

      if ($file) {
        return $file->url();
      }

      return null;
    },
    'fallbackSiteName' => function () {
      $model = $this->model();

      if ($model->site()->id() == $model->id())
        return $model->homePage()->ogSiteName()->or($model->site()->title())->value();

      return $model->site()->ogSiteName()->or($model->site()->title())->value();
    },
    'url' => function () {
      return $this->model()->url();
    },
  ]
];
